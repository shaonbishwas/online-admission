import axios from "axios";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";
const Lists = () => {
  const [data, setData] = useState([]);
  const [filterd, setFilterd] = useState(null);
  useEffect(() => {
    axios.get("https://online-admission-server.vercel.app/data").then((res) => {
      const data = res.data;
      setData(data);
      const cse = data.filter((d) => d.department == "CSE");
      const eee = data.filter((d) => d.department == "EEE");
      const cseInterested = cse.filter((d) => d.type == "INTERESTED");
      const eeeInterested = eee.filter((d) => d.type == "INTERESTED");
      const cseFormCollected = cse.filter((d) => d.type == "FORM COLLECTED");
      const eeeFormCollected = eee.filter((d) => d.type == "FORM COLLECTED");
      const cseAdmited = cse.filter((d) => d.type == "ADMITTED");
      const eeeAdmited = eee.filter((d) => d.type == "ADMITTED");
      const filterData = {
        cseAdmited,
        eeeAdmited,
        cseInterested,
        eeeInterested,
        cseFormCollected,
        eeeFormCollected,
        cse,
        eee,
      };
      setFilterd(filterData);
    });
  }, []);
  console.log(filterd);
  const handleDelete = (id, type) => {
    console.log(id, type);
    axios
      .delete(
        `https://online-admission-server.vercel.app/delete/${id}?type=${type}`
      )
      .then(() => {
        window.location.reload();
      });
  };
  const jsonToCsv = (jsonData) => {
    const csv = Papa.unparse(jsonData);
    return csv;
  };

  const handleDownloadCSV = async () => {
    // Fetch data from the API
    // const response = await fetch(
    //   "https://online-admission-server.vercel.app/data"
    // );
    // const students = await response.json();
    const csvData = jsonToCsv(data);

    const blob = new Blob([csvData], { type: "text/csv" });
    const link = document.createElement("a");

    link.href = window.URL.createObjectURL(blob);
    link.download = "api_data.csv";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };
  const generatePDF = async () => {
    try {
      // Fetch data from the API
      // const response = await fetch(
      //   "https://online-admission-server.vercel.app/data"
      // );
      // const students = await response.json();

      // Create a new PDF instance
      const pdf = new jsPDF();
      // Set column headers
      const headers = [
        [
          "Name",
          "Email",
          "Phone",
          "SSC GPA",
          "HSC GPA",
          "address",
          "Department",
          "Type",
          //   "Reg. Date",
        ],
      ];

      // Extract data from each student object and format it into an array
      const pdfdata = data.map((student) => [
        student.name,
        student.email,
        student.phone,
        student.ssc,
        student.hsc,
        student.address,
        student.department,
        student.type,
        // student.regDate,
      ]);

      // Set the styling for the table
      pdf.autoTable({
        head: headers,
        body: pdfdata,
      });

      // Save the PDF with a name
      pdf.save("student_data.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  if (data.length == 0) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-ball loading-lg text-4xl"></span>
      </div>
    );
  }
  return (
    <div className="max-w-[1200px] mx-auto mt-16">
      <div className="flex flex-col md:flex-row gap-16 mx-2">
        <div className="flex-1  pb-10  flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold mt-5 mb-10">CSE</h1>
          <div className="flex gap-10">
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-semibold text-md">Total Visitors</h1>
              <p className="font-semibold text-4xl">{filterd?.cse?.length}</p>
            </div>
            {/* <div>
              <p className="font-semibold">Admitted{filterd?.cseAdmited?.length}</p>
            </div> */}
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-semibold text-md">Form Collected</h1>
              <p className="font-semibold text-4xl">
                {filterd?.cseFormCollected?.length}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-semibold text-md">Interested</h1>
              <p className="font-semibold text-4xl">{filterd?.cseInterested?.length}</p>
            </div>
          </div>
        </div>
        <div className="flex-1  pb-10 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold mt-5 mb-10">EEE</h1>
          <div className="flex gap-10">
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-semibold text-md">Total Visitors</h1>
              <p className="font-semibold text-4xl">{filterd?.eee?.length}</p>
            </div>
            {/* <div>
              <p className="font-semibold">Admitted{filterd?.cseAdmited?.length}</p>
            </div> */}
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-semibold text-md">Form Collected</h1>
              <p className="font-semibold text-4xl">
                {filterd?.eeeFormCollected?.length}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-semibold text-md">Interested</h1>
              <p className="font-semibold text-4xl">{filterd?.eeeInterested?.length}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto mt-28">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th></th>
              <td>Name</td>
              <td>Email</td>
              <td>Phone</td>
              <td>SSC GPA</td>
              <td>HSC GPA</td>
              <td>Address</td>
              <td>Department</td>
              <td>Type</td>
              <td>Reg. Date</td>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((d, idx) => (
              <tr key={d._id}>
                <th>{idx + 1}</th>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.phone}</td>
                <td>{d.ssc}</td>
                <td>{d.hsc}</td>
                <td>{d.address}</td>
                <td>{d.department}</td>
                <td>{d.type}</td>
                <td>{d.regDate}</td>
                <td>
                  <button
                    className="text-red-600 hover:bg-gray-300 p-1"
                    onClick={() => handleDelete(d._id, d.type)}
                  >
                    DELETE
                  </button>
                </td>
                <th>{idx + 1}</th>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <td>Name</td>
              <td>Email</td>
              <td>Phone</td>
              <td>SSC GPA</td>
              <td>HSC GPA</td>
              <td>Address</td>
              <td>Department</td>
              <td>Type</td>
              <td>Reg. Date</td>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="text-center p-5 flex  gap-10 mt-10">
        <button
          disabled={data.length == 0 ? true : false}
          className="font-bold border p-2 rounded-3xl hover:bg-slate-700 hover:text-white"
          onClick={generatePDF}
        >
          Download PDF
        </button>
        <button
          disabled={data.length == 0 ? true : false}
          className="font-bold border p-2 rounded-3xl hover:bg-slate-700 hover:text-white"
          onClick={handleDownloadCSV}
        >
          Download CSV
        </button>
      </div>
      {/* <div className="text-center p-5">
        
      </div> */}
    </div>
  );
};

export default Lists;
