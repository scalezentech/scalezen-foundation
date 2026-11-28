import {
  BookOpen,
  ClipboardCheck,
  MonitorPlay,
  Compass,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const supportItems = [
  {
    number: "01",
    icon: BookOpen,
    title: "Learning Resources",
    description:
      "Access to relevant study materials, subject-wise notes, and learning resources designed to support students in their academic preparation.",
    features: [
      "Study notes and learning material",
      "Subject-wise educational resources",
    ],
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Practice & Assessment",
    description:
      "Opportunities to strengthen understanding and exam readiness through structured practice and assessment activities.",
    features: [
      "Practice questions and mock tests",
      "Performance assessment opportunities",
    ],
  },
  {
    number: "03",
    icon: MonitorPlay,
    title: "Digital Learning Support",
    description:
      "Where available, students may receive access to digital learning resources that make educational support more accessible.",
    features: [
      "Recorded lessons and digital content",
      "Online learning opportunities",
    ],
  },
  {
    number: "04",
    icon: Compass,
    title: "Guidance & Mentorship",
    description:
      "Selected initiatives may include educational guidance, career awareness, and mentorship to help students make informed decisions.",
    features: [
      "Educational and exam guidance",
      "Career awareness and mentorship",
    ],
  },
];

const StudentSupportSection = () => {
  return (
    <section
      id="student-support"
      className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px]">
        {/* Section Heading */}
        <div className="mb-12 grid gap-5 lg:mb-14 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-light-teal px-4 py-2 text-sm font-semibold text-teal">
              <BookOpen size={16} className="text-gold" />
              Student Support
            </div>

            <h2 className="max-w-2xl text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-[42px]">
              More Than Learning.
              <span className="block text-teal">
                Support for Every Step.
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-[15px] leading-7 text-slate-600 lg:justify-self-end">
            Our initiatives aim to support students through meaningful
            educational resources, learning opportunities, and guidance.
            The support provided depends on the objectives and availability
            of each approved program.
          </p>
        </div>

        {/* Support Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {supportItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.number}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-off-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-[0_16px_35px_-22px_rgba(14,59,66,0.3)]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full  transition-colors duration-300 bg-teal text-white group-hover:bg-gold group-hover:text-navy">
                    <Icon size={23} strokeWidth={1.8} />
                  </div>

                  <span className="text-sm font-semibold tracking-wider text-slate-300">
                    {item.number}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-navy">
                  {item.title}
                </h3>

                <p className="mb-6 flex-1 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>

                <div className="border-t border-slate-200 pt-5">
                  <ul className="space-y-3">
                    {item.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm leading-5 text-slate-600"
                      >
                        <CheckCircle2
                          size={16}
                          className="mt-0.5 shrink-0 text-teal"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </article>
            );
          })}
        </div>

        {/* Important Note */}
        <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-teal/15 bg-light-teal/50 p-5 sm:flex-row sm:items-start sm:p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full  bg-gold text-teal">
            <ArrowUpRight size={20} />
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-navy">
              Support Depends on the Approved Initiative
            </h3>
            <p className="text-sm leading-6 text-slate-600">
              These are examples of support that may be offered through
              Foundation initiatives. Actual resources, eligibility, and
              availability will be communicated separately for each approved
              program. Not every initiative will include all the support
              listed above.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentSupportSection;