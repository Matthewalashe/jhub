export type Job = {
    slug: string;
    title: string;
    company: string;
    location: string;
    level: string;
    workMode: string;
    deadline: string;
    applyEmail: string;
    summary: string;
};

export const jobs: Job[] = [
    {
        slug: "frontend-developer-example-company",
        title: "Frontend Developer",
        company: "Example Company",
        location: "Lagos",
        level: "Entry",
        workMode: "Hybrid",
        deadline: "Feb 28, 2026",
        applyEmail: "jobs@example.com",
        summary: "Build and maintain responsive UI systems."
    },
    {
        slug: "product-designer-startup-ng",
        title: "Product Designer",
        company: "Startup NG",
        location: "Remote (Nigeria)",
        level: "Mid",
        workMode: "Remote",
        deadline: "Mar 5, 2026",
        applyEmail: "talent@startup.ng",
        summary: "Design UX flows and interfaces."
    },
    {
        slug: "data-analyst-fintech-lagos",
        title: "Data Analyst",
        company: "Fintech Lagos",
        location: "Lagos",
        level: "Entry",
        workMode: "On-site",
        deadline: "Mar 1, 2026",
        applyEmail: "hr@fintechlagos.com",
        summary: "Analyze datasets and generate reports."
    }
];
