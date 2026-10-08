// Site-wide constants: names, outside links and navigation.

export const site = {
  name: "Curing with Care",
  shortName: "CARE",
  // The wordmark as the organization writes it today.
  wordmark: "curingwithCARE",
  tagline: "Students starting chapters for cancer awareness, research, and care.",
  description:
    "Curing with Care (CARE) is a student-run 501(c)(3) nonprofit. High school students start chapters at their schools to raise cancer awareness, support research, and care for patients in their communities.",
  email: "curingwithcare@gmail.com",
  domain: "https://curingwithcare.org",
  donateUrl: "https://www.zeffy.com/en-US/donation-form/donate-to-curingwithcare",
  // [TODO: separate chapter-application form if the team has one]
  joinFormUrl: "https://forms.gle/S2WH6htwdTTHK2gy9",
  startBranchFormUrl: "https://forms.gle/S2WH6htwdTTHK2gy9",
  instagram: "https://www.instagram.com/curingwithcare/",
  linkedin: "https://www.linkedin.com/company/curingwithcare",
  facebook: "https://www.facebook.com/people/curingwithcare/61551833566559/",
  // Hidden until the blog server (Ghost on Oracle Cloud) is back up.
  blogUrl: "https://blog.curingwithcare.org",
  blogEnabled: false,
};

export const navItems = [
  { label: "About", href: "/about" },
  { label: "Branches", href: "/branches" },
  { label: "Events", href: "/events" },
  { label: "Research", href: "/research" },
  { label: "Team", href: "/team" },
];
