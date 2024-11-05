// list and constants tabs in App
import { ValidatesDatasErrors } from "./Types";

// 2. Login and Register Tabs
export const LogTabValue = [
    {
        from: "Login",
        label: "Email",
        id: 0,
        type: "email",
        placeholder: "cherubin@gmail.com",
        secure: false,
        checked: true,
        errorType: ValidatesDatasErrors.LOGEMAIL,
    },
    {
        from: "Login",
        label: "Mot de passe",
        id: 1,
        type: "none",
        placeholder: "*********",
        secure: true,
        checked: false,
        errorType: ValidatesDatasErrors.NONE,
    },
];

export const RegTabValue = [
    {
        from: "Register",
        label: "Nom complet",
        id: 0,
        type: "none",
        placeholder: "Cherubin Mahamba",
        secure: false,
        checked: true,
        errorType: ValidatesDatasErrors.NAME,
    },
    {
        from: "Register",
        label: "Email",
        id: 1,
        type: "Email",
        placeholder: "cherubin@gmail.com",
        secure: false,
        checked: true,
        errorType: ValidatesDatasErrors.REGEMAIL,
    },
    {
        from: "Register",
        label: "Téléphone",
        id: 2,
        type: "text",
        placeholder: "+243 973 668 210",
        secure: false,
        checked: true,
        errorType: ValidatesDatasErrors.PHONE,
    },
];

export const ConfigurationAccountTaabValue = [
    {
        from: "Register",
        label: "Téléphone",
        id: 4,
        type: "none",
        placeholder: "+243 973 668 210",
        secure: false,
        checked: true,
        errorType: ValidatesDatasErrors.PHONE,
    },
    {
        from: "Register",
        label: "Année de naissance",
        id: 5,
        type: "none",
        placeholder: "2005",
        secure: false,
        checked: true,
        errorType: ValidatesDatasErrors.BIRTHYEAR,
    },
];

export const ResetTabValues = [
    {
        from: "Reset",
        label: "Mot de pass",
        id: 0,
        type: "none",
        placeholder: "**********",
        secure: true,
        checked: true,
        errorType: ValidatesDatasErrors.STRONGPASSWORD,
    },
    {
        from: "Reset",
        label: "Confirmation mot de pass",
        id: 1,
        type: "none",
        placeholder: "**********",
        secure: true,
        checked: true,
        errorType: ValidatesDatasErrors.CONFIRMRESETPWD,
    },
];

export const SystemMessages = {
    Errors: {
        invalidEmail: "Format de l'email invalide, ex: Cherubin@gmail.com ",
        invalidName: "Format du nom invalide, ex: Cherubin Mahamba",
        InvalidStrongPassword:
            "Doit contenir au mois 8 caractères, Majuscules, Muniscules, Caractères speciaux [@#$%&{}...]",
        inValidPassword: "Les mots de passes ne correspondent pas",
        inValidPhoneNumber: "Numéro de téléphone incorrect (+)",
        invalidBirthDay: "votre âge n'est pas accepté",
    },
    Success: {},
};
