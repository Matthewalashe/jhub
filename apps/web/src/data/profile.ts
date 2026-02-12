export type ApplyProfile = {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedIn?: string;
    portfolio?: string;

    roleTarget?: string;

    summary: string;

    experience1Title: string;
    experience1Company: string;
    experience1Period: string;
    experience1Bullets: string;

    experience2Title?: string;
    experience2Company?: string;
    experience2Period?: string;
    experience2Bullets?: string;

    education: string;
    skills: string;
};

export const DEFAULT_PROFILE: ApplyProfile = {
    fullName: "",
    email: "",
    phone: "",
    location: "Nigeria",
    linkedIn: "",
    portfolio: "",
    roleTarget: "",

    summary: "",

    experience1Title: "",
    experience1Company: "",
    experience1Period: "",
    experience1Bullets: "",

    experience2Title: "",
    experience2Company: "",
    experience2Period: "",
    experience2Bullets: "",

    education: "",
    skills: "",
};
