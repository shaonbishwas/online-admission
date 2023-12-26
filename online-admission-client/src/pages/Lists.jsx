import axios from "axios";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
const Lists = () => {
  const generatePDF = async () => {
    try {
      // Fetch data from the API
      const response = await fetch(
        "https://online-admission-server.vercel.app/data"
      );
      const students = await response.json();

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
      const data = students.map((student) => [
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
        body: data,
      });

      // Save the PDF with a name
      pdf.save("student_data.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("https://online-admission-server.vercel.app/data").then((res) => {
      setData(res.data);
    });
  }, []);
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
  return (
    <div>
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
      <div className="text-center p-5">
        <button
          disabled={data.length == 0 ? true : false}
          className="font-bold border p-2 rounded-3xl hover:bg-slate-700 hover:text-white"
          onClick={generatePDF}
        >
          Download pdf
        </button>
      </div>
    </div>
  );
};

export default Lists;
