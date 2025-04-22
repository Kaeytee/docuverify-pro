import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import JsBarcode from "jsbarcode";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

const formSchema = z.object({
  country: z.string().min(1, "Country is required"),
  documentType: z.enum(["DRIVERS_LICENSE", "NATIONAL_ID"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().optional(),
  height: z.string().optional(),
  eyeColor: z.string().optional(),
  photo: z.any().optional(),
});

type FormData = z.infer<typeof formSchema>;

// Helper functions
const generateRandomIDNumber = (country: string) => {
  const checksum = Math.floor(Math.random() * 10);
  const currentYear = new Date().getFullYear().toString().slice(-2);
  
  switch (country) {
    case "US-NY":
      return `NY${currentYear}${Math.floor(100000 + Math.random() * 900000)}${checksum}`;
    case "US-PA":
      return `PA${Math.floor(10000000 + Math.random() * 90000000)}${checksum}`;
    case "SI":
      const dobPart = new Date().toISOString().slice(2, 10).replace(/-/g, '');
      return `SI${dobPart}${Math.floor(1000 + Math.random() * 9000)}${checksum}`;
    default:
      return `${country}${Math.floor(100000000 + Math.random() * 900000000)}`;
  }
};

const generateIssueDateAndExpiry = () => {
  const today = new Date();
  const expiryDate = new Date(today);
  expiryDate.setFullYear(expiryDate.getFullYear() + 8);
  
  return {
    issueDate: today.toISOString().split('T')[0],
    expiryDate: expiryDate.toISOString().split('T')[0]
  };
};

const formatDate = (dateString: string, country: string) => {
  try {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat(
      country === "SI" ? "sl-SI" : "en-US", 
      {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      }
    );
    return formatter.format(date);
  } catch {
    return "N/A";
  }
};

const generateSignature = () => {
  const styles = [
    `M10,40 Q${20+Math.random()*30},${20+Math.random()*30} 40,30 T${80+Math.random()*40},${20+Math.random()*30} 130,40`,
    `M10,35 L${30+Math.random()*20},${25+Math.random()*10} L${60+Math.random()*30},${40+Math.random()*10} L130,32`
  ];
  return {
    path: styles[Math.floor(Math.random() * styles.length)],
    strokeWidth: 1 + Math.random() * 0.5,
    opacity: 0.8 + Math.random() * 0.2
  };
};

const IDGenerator = () => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [idData, setIdData] = useState({
    number: "",
    issueDate: "",
    expiryDate: "",
    signature: { path: "", strokeWidth: 1, opacity: 1 }
  });
  const idCardRef = useRef<HTMLDivElement>(null);
  const barcodeRef = useRef<SVGSVGElement>(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      documentType: "NATIONAL_ID",
      gender: "M",
      eyeColor: "BRO",
      height: "5-10",
    }
  });

  const formData = watch();
  const currentCountry = formData.country;

  useEffect(() => {
    if (barcodeRef.current && idData.number) {
      JsBarcode(barcodeRef.current, idData.number, {
        format: "CODE128",
        width: 1.5,
        height: 40,
        displayValue: false
      });
    }
  }, [idData.number]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhotoUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const generateID = (data: FormData) => {
    const dates = generateIssueDateAndExpiry();
    const idNumber = generateRandomIDNumber(data.country);
    
    setIdData({
      number: idNumber,
      issueDate: dates.issueDate,
      expiryDate: dates.expiryDate,
      signature: generateSignature()
    });
  };

  const downloadID = async () => {
    if (idCardRef.current) {
      const canvas = await html2canvas(idCardRef.current, { scale: 3 });
      canvas.toBlob(blob => blob && saveAs(blob, `${currentCountry}-id.png`));
    }
  };

  const renderIDCard = () => {
    switch (currentCountry) {
      case "SI": return (
        <div ref={idCardRef} className="bg-white rounded-lg shadow-lg mx-auto"
             style={{ width: "85.6mm", height: "54mm", padding: "10px" }}>
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-start gap-2 mb-3">
              <div className="bg-blue-800 text-white text-xs px-2 py-1">SI</div>
              <div className="flex-1">
                <p className="font-bold text-sm uppercase">REPUBLIKA SLOVENIJA</p>
                <p className="text-[0.65rem]">Identity Card</p>
              </div>
              <div className="text-right">
                <p className="text-[0.65rem]">Document No:</p>
                <p className="font-bold text-xs">{idData.number}</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex gap-4">
              {/* Left Column - Photo */}
              <div className="w-[30%]">
                <div className="border border-gray-300 overflow-hidden mb-1">
                  {photoUrl ? (
                    <img src={photoUrl} alt="ID" className="w-full object-cover" style={{height: "120px"}} />
                  ) : (
                    <div className="w-full bg-gray-200 flex items-center justify-center" style={{height: "120px"}}>
                      <span className="text-gray-500 text-xs">PHOTO</span>
                    </div>
                  )}
                </div>
                <p className="text-[0.65rem] text-center">
                  {formatDate(formData.dateOfBirth, "SI")}
                </p>
              </div>

              {/* Right Column - Details */}
              <div className="flex-1">
                <div className="mb-3">
                  <p className="text-[0.65rem] text-gray-600">Surname/Príimek</p>
                  <p className="font-bold text-sm uppercase">{formData.lastName}</p>
                </div>
                <div className="mb-3">
                  <p className="text-[0.65rem] text-gray-600">Given name(s)/Íme</p>
                  <p className="font-bold text-sm uppercase">{formData.firstName}</p>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[0.65rem]">
                  <div>
                    <p className="text-gray-600">Date of birth</p>
                    <p className="font-bold">{formatDate(formData.dateOfBirth, "SI")}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Sex</p>
                    <p className="font-bold">{formData.gender}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Issue date</p>
                    <p className="font-bold">{formatDate(idData.issueDate, "SI")}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Expiry date</p>
                    <p className="font-bold">{formatDate(idData.expiryDate, "SI")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Signature */}
            <div className="mt-auto">
              <p className="text-[0.6rem] text-gray-600 mb-1">Signature/Podpis</p>
              <svg viewBox="0 0 150 30" className="h-6 w-full">
                <path d={idData.signature.path} stroke="#000" fill="none" 
                      strokeWidth={idData.signature.strokeWidth} 
                      strokeOpacity={idData.signature.opacity} />
              </svg>
            </div>

            {/* Barcode */}
            <div className="mt-2">
              <svg ref={barcodeRef} className="w-full h-8" />
            </div>
          </div>
        </div>
      );

      case "US-PA": return (
        <div ref={idCardRef} className="bg-white rounded-lg shadow-lg mx-auto"
             style={{ width: "85.6mm", height: "54mm", padding: "10px" }}>
          <div className="h-full flex flex-col bg-gradient-to-b from-yellow-400 to-yellow-300">
            <div className="p-2 border-b-4 border-blue-800">
              <h1 className="text-2xl font-bold italic">PENNSYLVANIA</h1>
              <p className="text-xs">Driver's License</p>
            </div>

            <div className="flex flex-1 bg-white p-2">
              <div className="w-1/3 pr-2">
                <div className="border-2 border-gray-400 rounded-sm overflow-hidden">
                  {photoUrl ? (
                    <img src={photoUrl} alt="ID" className="w-full h-32 object-cover" />
                  ) : (
                    <div className="h-32 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">PHOTO</span>
                    </div>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <svg viewBox="0 0 150 30" className="h-8 w-full">
                    <path d={idData.signature.path} stroke="#000" fill="none" 
                          strokeWidth={idData.signature.strokeWidth} />
                  </svg>
                </div>
              </div>

              <div className="w-2/3 pl-2 text-sm">
                <div className="mb-1">
                  <span className="inline-block w-12">ID:</span>
                  <span className="font-bold">{idData.number}</span>
                </div>
                <div className="mb-1">
                  <span className="inline-block w-12">DOB:</span>
                  <span className="font-bold">{formatDate(formData.dateOfBirth, "US-PA")}</span>
                </div>
                <div className="mb-1">
                  <span className="inline-block w-12">NAME:</span>
                  <span className="font-bold uppercase">{formData.lastName}, {formData.firstName}</span>
                </div>
                <div className="mb-1">
                  <span className="inline-block w-12">ADDR:</span>
                  <span className="font-bold">{formData.address}</span>
                </div>
                <div className="mb-1">
                  <span className="inline-block w-12">CITY:</span>
                  <span className="font-bold">{formData.city}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                  <div>
                    <span className="text-xs">ISS:</span>
                    <span className="font-bold">{formatDate(idData.issueDate, "US-PA")}</span>
                  </div>
                  <div>
                    <span className="text-xs">EXP:</span>
                    <span className="font-bold">{formatDate(idData.expiryDate, "US-PA")}</span>
                  </div>
                  <div>
                    <span className="text-xs">SEX:</span>
                    <span className="font-bold">{formData.gender}</span>
                  </div>
                  <div>
                    <span className="text-xs">HT:</span>
                    <span className="font-bold">{formData.height}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-800 p-1 text-white text-center text-xs">
              DL-{idData.number}
            </div>
          </div>
        </div>
      );

      default: return (
        <div ref={idCardRef} className="bg-white rounded-lg shadow-lg mx-auto"
             style={{ width: "85.6mm", height: "54mm", padding: "10px" }}>
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a country to preview ID
          </div>
        </div>
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'url("/home.svg")',
        backgroundRepeat: 'repeat',
        backgroundSize: '500px 500px',
        pointerEvents: 'none'
      }} />
      <div className="container mx-auto p-4 relative z-10">
        <h1 className="text-3xl font-bold text-center mb-8">Professional ID Card Generator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={handleSubmit(generateID)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <select {...register("country")} className="w-full p-2 border rounded">
                    <option value="">Select Country</option>
                    <option value="SI">Slovenia</option>
                    <option value="US-PA">Pennsylvania</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Document Type</label>
                  <select {...register("documentType")} className="w-full p-2 border rounded">
                    <option value="NATIONAL_ID">National ID</option>
                    <option value="DRIVERS_LICENSE">Driver's License</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input {...register("firstName")} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input {...register("lastName")} className="w-full p-2 border rounded" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input {...register("address")} className="w-full p-2 border rounded" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input {...register("city")} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Date of Birth</label>
                  <input type="date" {...register("dateOfBirth")} className="w-full p-2 border rounded" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Gender</label>
                  <select {...register("gender")} className="w-full p-2 border rounded">
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Height</label>
                  <select {...register("height")} className="w-full p-2 border rounded">
                    {Array.from({length: 12}, (_, i) => 58 + i).map(height => {
                      const feet = Math.floor(height/12);
                      const inches = height % 12;
                      return (
                        <option key={height} value={`${feet}-${inches}`}>
                          {feet}' {inches}"
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Eye Color</label>
                  <select {...register("eyeColor")} className="w-full p-2 border rounded">
                    <option value="BRO">Brown</option>
                    <option value="BLU">Blue</option>
                    <option value="GRN">Green</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Photo</label>
                <input type="file" onChange={handlePhotoUpload} 
                       className="w-full p-2 border rounded" accept="image/*" />
              </div>

              <button type="submit" 
                      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Generate ID Card
              </button>
              <button onClick={downloadID} 
                      className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                      disabled={!idData.number}>
                Download ID
              </button>
            </form>
          </div>

          {/* Preview Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">ID Preview</h2>
            <div className="flex justify-center items-center min-h-[250px] p-4">
              {renderIDCard()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDGenerator;