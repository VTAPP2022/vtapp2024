import React from "react";
import TeamCard from "@vtapp/components/TeamCard";

function Team() {
  return (
    <section className="bg-slate-900 flex flex-col">
      <div className="container px-6 py-10 mx-auto ">
        <h1 className="text-3xl font-semibold text-center capitalize lg:text-4xl text-white">
          VTAPP Team
        </h1>

        <div className="flex justify-center mx-auto mt-2">
          <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
        </div>

        <div className="flex flex-wrap justify-center mt-6">
          <TeamCard
            photo="https://vit.ac.in/sites/default/files/VISWANATHAN_0.jpg/"
            name="DR. G. VISWANATHAN"
            designation="Chancellor"
          />
        </div>
      </div>

      <div className="container px-6 py-10 mx-auto ">
        <div className="flex flex-wrap justify-center mt-6">
          <TeamCard
            name="MR. SANKAR VISWANATHAN"
            photo="https://vit.ac.in/system/files/vp.jpg"
            designation="Vice - President"
          />
          <TeamCard
            name="DR. SEKAR VISWANATHAN"
            photo="https://vit.ac.in/sites/default/files/SEKAR_VISWANATHAN1.jpg"
            designation="Vice - President"
          />
          <TeamCard
            name="MR. G V SELVAM"
            photo="https://vit.ac.in/system/files/gvs.jpg"
            designation="Vice - President"
          />
        </div>
      </div>

      <div className="container px-6 py-10 mx-auto ">
        <div className="flex flex-wrap justify-center mt-6">
          <TeamCard
            name="Dr. Sandhya Pentareddy"
            photo="https://vitap.ac.in/wp-content/uploads/2020/12/Sandhya-Madam.jpg"
            designation="Executive Director"
          />
          <TeamCard
            name="Ms. Kadhambari S. Viswanathan"
            photo="https://chennai.vit.ac.in/wp-content/uploads/2020/11/avp.jpg"
            designation="Assistant Vice - President"
          />
        </div>
      </div>

      <div className="container px-6 py-10 mx-auto ">
        <div className="flex flex-wrap justify-center mt-6">
          <TeamCard
            name="Dr. S. V. Kota Reddy"
            photo="https://vitap.ac.in/wp-content/uploads/2020/12/SV-Kota-Reddy-Sir.jpg"
            designation="Vice Chancellor"
          />
          <TeamCard
            name="Dr. Jagadish Chandra Mudiganti"
            photo="https://vitap.ac.in/wp-content/uploads/2022/10/Registrar-scaled.jpg"
            designation="Registrar"
          />
        </div>
      </div>

      <div className="container px-6 py-10 mx-auto ">
        <div className="flex flex-wrap justify-center mt-6">
          <TeamCard
            name="Dr. Sibi Chakkaravarthy Sethuraman"
            photo="https://vitap.ac.in/wp-content/uploads/2019/06/Dr.-S.-SIBI-CHAKRAVARTY.jpg"
            designation="Convener"
          />

          <TeamCard
            name="Dr.SK.KHADHEER PASHA"
            photo="https://vitap.ac.in/wp-content/uploads/2020/07/Dr.-SK.-KHADHEER-PASHA.jpg"
            designation="Deputy Director, Student Welfare"
          />
        </div>
      </div>
      <div className="container px-6 py-10 mx-auto ">
        <div className="flex flex-wrap justify-center mt-6">
          <TeamCard
            name="Dr.HARI KISHAN KONDAVEETI"
            photo="https://vitap.ac.in/wp-content/uploads/2019/06/Mr.-HARI-KISHAN-KONDAVEETI.jpg"
            designation="Co Convenor (SCOPE)"
          />

          <TeamCard
            name="Dr. Ellison M S"
            photo="https://vitap.ac.in/wp-content/uploads/2019/06/Dr.-SUDHA-ELLISON-MATHE.jpg"
            designation="Co Convenor (SENSE)"
          />
        </div>
      </div>

      {/* <div className="container px-6 py-10 mx-auto ">
        <h1 className="text-3xl font-semibold text-center capitalize lg:text-4xl text-white">
          STUDENT ORGANISING TEAM
        </h1>

        <div className="flex justify-center mx-auto mt-2">
          <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
          <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
        </div>

        <div className="container px-6 py-10 mx-auto ">
          <br />
          <h2 className="text-3xl text-blue-700 text-center font-bold">
            Event Team
          </h2>
          <div className="flex flex-wrap justify-center mt-6">
            <TeamCard
              name="Shashmit Kumar"
              photo="https://i.imgur.com/toIr1c3.png"
              designation=""
            />

            <TeamCard
              name="Raj Mishra"
              photo="https://i.imgur.com/JOGyfhh.jpg"
              designation=""
            />

            <TeamCard
              name="Jasjot Singh"
              photo="https://i.imgur.com/JSPW3mw.jpg"
              designation=""
            />
          </div>
          <br />
          <br />
          <br />
          <h2 className="text-3xl text-blue-700 text-center font-bold">
            Web & Registrations
          </h2>
          <div className="flex flex-wrap justify-center mt-6">
            <TeamCard
              name="Sai Pranay"
              photo="https://i.imgur.com/GQ8a2Im.jpg"
              designation=""
            />

            <TeamCard
              name="Akhil"
              photo="https://i.imgur.com/gejaB9P.jpg"
              designation=""
            />
          </div>

          <br />
          <br />
          <br />
          <h2 className="text-3xl text-blue-700 text-center font-bold">
            Design Team
          </h2>
          <div className="flex flex-wrap justify-center mt-6">
            <TeamCard
              name="Sai Charan Venna"
              photo="https://i.imgur.com/UNnnLFD.jpg"
              designation=""
            />

            <TeamCard
              name="H.V Mallesh"
              photo="https://i.imgur.com/uSGZCfK.png"
              designation=""
            />

            <TeamCard
              name="S.SWARAJ"
              photo="https://i.imgur.com/U7Qn1Nb.jpeg"
              designation=""
            />

            <TeamCard
              name="Jayashish Segu"
              photo="https://i.imgur.com/MXLCmju.jpg"
              designation=""
            />

            <TeamCard
              name="Rion"
              photo="https://i.imgur.com/MpR8Akj.jpg"
              designation=""
            />

            <TeamCard
              name="Harsh Gupta"
              photo="https://i.imgur.com/AGQx0ar.jpg"
              designation=""
            />
          </div>

          <br />
          <br />
          <br />
          <h2 className="text-3xl text-blue-700 text-center font-bold">
            Documentation and Content
          </h2>
          <div className="flex flex-wrap justify-center mt-6">
            <TeamCard
              name="Suhani Malik"
              photo="https://i.imgur.com/3QxjiCf.jpg"
              designation=""
            />

            <TeamCard
              name="Vinay Suryawanshi"
              photo="https://i.imgur.com/UQFmT4y.jpg"
              designation=""
            />
          </div>

          <br />
          <br />
          <br />
          <h2 className="text-3xl text-blue-700 text-center font-bold">
            Discipline
          </h2>
          <div className="flex flex-wrap justify-center mt-6">
            <TeamCard
              name="C YAGNESH"
              photo="https://i.imgur.com/IYelthT.png"
              designation=""
            />
          </div>

          <br />
          <br />
          <br />
          <h2 className="text-3xl text-blue-700 text-center font-bold">
            Finance Team
          </h2>
          <div className="flex flex-wrap justify-center mt-6">
            <TeamCard
              name="Amey Negandhi"
              photo="https://i.imgur.com/xc8Bgw5.jpg"
              designation=""
            />
            <TeamCard
              name="Chaitanya Nagre"
              photo="https://i.imgur.com/wH3A1s9.jpg"
              designation=""
            />
            <TeamCard
              name="Aditya Shrivastava"
              photo="https://i.imgur.com/C2ZTed2.jpg"
              designation=""
            />
          </div>
        </div>
      </div> */}
    </section>
  );
}

export default Team;
