
import {
  Search,
  FileText,
  ClipboardCheck,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";

const applicationSteps = [
  {
    number: "01",
    icon: Search,
    title: "Explore Available Programs",
    description:
      "Review the available initiatives, understand their objectives, and check the eligibility requirements before applying.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Submit Your Application",
    description:
      "Complete the application form with accurate student and guardian information for the selected initiative.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Application Review",
    description:
      "The Foundation reviews applications against the program's eligibility criteria, available capacity, and submitted information.",
  },
  {
    number: "04",
    icon: GraduationCap,
    title: "Receive an Application Decision",
    description:
      "Applicants are informed of the decision. Selected students receive further instructions about the approved educational support.",
  },
];

const ProgramApplicationSection = () => {
  return (
    <section
      id="how-to-apply"
      className="bg-off-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="mx-auto max-w-[1320px]">
        {/* Section Heading */}
        <div className="mb-12 text-center lg:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-light-teal px-4 py-2 text-sm font-semibold text-teal">
            <FileText size={16} className="text-gold" />
            Application Process
          </div>

          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-[42px]">
            Getting Started Is
            <span className="block text-teal">Simple and Transparent.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-slate-600">
            Follow these steps to apply for an educational support initiative
            through ScaleZen Foundation.
          </p>
        </div>

        {/* Application Steps */}
        <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {applicationSteps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="group relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-[0_16px_35px_-22px_rgba(14,59,66,0.3)]"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal text-white transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                    <Icon size={23} strokeWidth={1.8} />
                  </div>

                  <span className="text-sm font-semibold tracking-wider text-slate-300">
                    STEP {step.number}
                  </span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-navy">
                  {step.title}
                </h3>

                <p className="flex-1 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>

              </article>
            );
          })}
        </div>

        {/* Application Information */}
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="flex gap-4 rounded-3xl border border-teal/15 bg-light-teal/50 p-5 sm:p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-teal">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-navy">
                No Documents Required Initially
              </h3>
              <p className="text-sm leading-6 text-slate-600">
                You do not need to upload documents when submitting the initial
                application. If verification is necessary, the Foundation may
                request additional information through an appropriate private
                channel.
              </p>
            </div>
          </div>

          <div className="flex gap-4 rounded-3xl border border-amber-200/70 bg-amber-50/70 p-5 sm:p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-amber-700">
              <Info size={22} />
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-navy">
                Application Does Not Guarantee Selection
              </h3>
              <p className="text-sm leading-6 text-slate-600">
                Every application is subject to eligibility verification,
                program requirements, and available capacity. Only approved
                applicants will receive the relevant support.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl bg-navy px-6 py-8 sm:px-9 lg:flex-row lg:px-10">
          <div>
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              Ready to Explore Your Opportunities?
            </h3>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Find an initiative that matches your educational needs and
              review its application requirements.
            </p>
          </div>

          <Link
            to="/apply"
            className={`group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-gold py-3.5 pl-7 pr-3.5 text-[15px] font-bold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-navy`}
          >
            Apply Now
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy/10 transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProgramApplicationSection;
