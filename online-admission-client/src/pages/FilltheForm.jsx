import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function FilltheForm() {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const phone = form.phone.value;
    const ssc = form.ssc.value;
    const hsc = form.hsc.value;
    const district = form.district.value;
    const subdistrict = form.subdistrict.value;
    const village = form.village.value;
    const department = form.department.value;
    const type = form.type.value;
    const body = {
      email,
      name,
      phone,
      ssc,
      hsc,
      department,
      type,
      address: `${village},${subdistrict},${district}`,
    };
    // console.log(email, name, phone, ssc, hsc, department,type);
    Swal.fire({
      title: `Do you want to save name=${name} email=${email} phone=${phone} ssc=${ssc} hsc=${hsc} department=${department} address=${village},${subdistrict},${district}`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios
          .post(
            `https://online-admission-server.vercel.app/add?category=${type}`,
            body
          )
          .then(() => {
            Swal.fire("Saved!", "", "success");
            navigate('/');
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "error");
      }
    });
  };
  return (
    <div className="my-20">
      <form
        action=""
        className="w-[90%] mx-auto space-y-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-center gap-1">
          <label htmlFor="">
            <span>Name</span>
          </label>
          <input
            type="text"
            className="border py-2 pl-3 rounded-lg"
            placeholder="Your Name"
            name="name"
            required
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <label htmlFor="">
            <span>Email</span>
          </label>
          <input
            type="email"
            className="border py-2 pl-3 rounded-lg"
            placeholder="Your Email"
            name="email"
            required
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <label htmlFor="">
            <span>Phone</span>
          </label>
          <input
            type="number"
            className="border py-2 pl-3 rounded-lg"
            placeholder="Phone Number"
            name="phone"
            required
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <label htmlFor="">
            <span>SSC</span>
          </label>
          <input
            type="number"
            className="border py-2 pl-3 rounded-lg"
            placeholder="SSC GPA"
            name="ssc"
            required
            min="0"
            max="1000"
            step="0.01"
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <label htmlFor="">
            <span>HSC</span>
          </label>
          <input
            type="number"
            className="border py-2 pl-3 rounded-lg"
            placeholder="HSC GPA"
            name="hsc"
            required
            min="0"
            max="1000"
            step="0.01"
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <label htmlFor="">
            <span>District</span>
          </label>
          <input
            type="text"
            className="border py-2 pl-3 rounded-lg"
            placeholder="District"
            name="district"
            required
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <label htmlFor="">
            <span>Sub-district</span>
          </label>
          <input
            type="text"
            className="border py-2 pl-3 rounded-lg"
            placeholder="Sub-district"
            name="subdistrict"
            required
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <label htmlFor="">
            <span>Village/town</span>
          </label>
          <input
            type="text"
            className="border py-2 pl-3 rounded-lg"
            placeholder="Village/town"
            name="village"
            required
          />
        </div>
        <div className="flex flex-col justify-center gap-1">
          <label htmlFor="">
            <span>Select Department</span>
          </label>
          <select
            name="department"
            id=""
            className="border py-2 pl-3 rounded-lg"
          >
            <option value="CSE">CSE</option>
            <option value="EEE">EEE</option>
            {/* <option value="BBA">BBA</option>
            <option value="English">English</option>
            <option value="Sociology">Sociology</option> */}
          </select>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <label htmlFor="">
            <span>Registration Type</span>
          </label>
          <select name="type" id="" className="border py-2 pl-3 rounded-lg">
            <option value="INTERESTED">INTERESTED</option>
            <option value="FORM COLLECTED">FORM COLLECTED</option>
            {/* <option value="BBA">BBA</option>
            <option value="English">English</option>
            <option value="Sociology">Sociology</option> */}
          </select>
        </div>
        <div>
          <button className="hover:border-b border-b-4 border py-2 px-10 border-black rounded-lg font-bold">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
export default FilltheForm;
