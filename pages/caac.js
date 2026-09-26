import Head from "next/head";

export default function CAAC() {
  return (
    <>
      <Head>
        <title>Cancer Awareness & Action Challenge | CARE</title>
        <meta name="description" content="Join the Cancer Awareness & Action Challenge and make a difference!" />
      </Head>
      <div className="p-6 md:p-12 pt-24 md:pt-36 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center py-12 px-4">
        <main className="w-full flex flex-col items-center justify-center">
          {/* Info Section */}
          <div className="w-full max-w-4xl mb-12">
            <div className="text-center mb-6">
              <span className="text-base md:text-lg font-semibold text-green-700">
                Hosted by <span className="font-bold">curingwithCARE</span> &{" "}
                <span className="font-bold">HSHRF</span>
              </span>
            </div>
            <h1 className="--font-fredoka font-bold text-4xl md:text-5xl text-green-600 mb-4 text-center">
              2025 Cancer Awareness & Action Challenge
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-400 mx-auto mb-6 rounded"></div>
            <p className="text-lg md:text-xl text-gray-700 mb-6 text-center">
              Cancer is among the globe's most crucial global health issues. This
              disease affects hundreds of thousands of individuals each year.{" "}
              <span className="font-semibold text-green-700">curingwithCARE</span>{" "}
              and the{" "}
              <span className="font-semibold text-green-700">
                High School Health Research Forum
              </span>{" "}
              are thrilled to host and introduce the 2025 Cancer Awareness & Action
              Challenge.
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-6 text-center">
              This is a challenge for high school students designed to cultivate
              and gather creative, evidence-driven, and implementable solutions in
              addressing cancer prevention, access to care, public education, and
              healthcare policy problems. Semifinalists will receive recognition
              and the winner, in addition, will receive a cash award.
            </p>
            <p className="text-base md:text-lg text-gray-700 mb-6 text-center">
              This challenge is designed to allow high school students to develop
              their own creative and critical thinking skills as well as offer an
              opportunity for students with an interest in health advocacy,
              research, and community outreach to put their skillsets in action.{" "}
              <span className="font-semibold">
                No research experience is needed whatsoever.
              </span>{" "}
              This challenge only requires your ability to include passion,
              feasibility, and impact in one submission!
            </p>
            <div className="bg-white/70 rounded-xl shadow p-4 mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-2 text-center">
                Eligibility
              </h2>
              <ul className="list-disc list-inside text-gray-700 text-left mx-auto max-w-md">
                <li>
                  The competition is only open to full-time high school students
                  (grades 9-12) attending a public school, private school, or home
                  school at the time of application.
                </li>
                <li>U.S. citizenship is not required</li>
                <li>International students may submit</li>
                <li>
                  Students living outside of the U.S. are eligible to submit
                </li>
              </ul>
            </div>
            <div className="bg-white/70 rounded-xl shadow p-4 mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-green-700 mb-2 text-center">
                2025 Prompt
              </h2>
              <p className="text-gray-700 mb-2 text-center">
                Select a specific, pressing problem of cancer prevention, access to
                treatment, awareness, or policy and propose an innovative,
                practical solution that can be created, campaigned for, and enacted
                by adolescents to address the issue.
              </p>
              <p className="text-gray-700 text-center">
                Access the full guidelines document to ensure a quality
                submission!
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
              <a
                href="https://hshrf.org/caac"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-500 to-emerald-400 text-white font-bold px-6 py-3 rounded-lg shadow hover:scale-105 transition-transform text-center"
              >
                Full Guidelines Document
              </a>
              <button
                disabled
                className="bg-white border border-green-400 text-green-700 font-bold px-6 py-3 rounded-lg shadow cursor-not-allowed opacity-70"
                title="Opens Aug 1st"
              >
                Submission (Opens Aug 1st)
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
