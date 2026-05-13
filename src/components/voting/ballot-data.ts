import avatar01 from "../../assets/mocks/avatars/avatar01.svg";
import image01 from "../../assets/mocks/images/image01.svg";

export type BallotOption = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  note: string;
  imageSrc: string;
};

export const guideSteps = [
  {
    title: "Autenticación",
    description: "Verifica tu identidad antes de continuar con el flujo.",
  },
  {
    title: "Revisa la guía",
    description:
      "Lee cada paso antes de entrar al tarjetón para saber qué espera el sistema en cada pantalla.",
  },
  {
    title: "Tarjetón",
    description:
      "Marca una sola opción para que el sistema conserve una única selección activa.",
  },
  {
    title: "Registro",
    description:
      "Antes del envío verás un resumen claro de la opción elegida para validar el registro.",
  },
] as const;

const candidateOptions: BallotOption[] = [
  {
    id: "ana-lopez",
    title: "Ana López",
    subtitle: "Partido Renovación Ciudadana",
    description:
      "Propone un enfoque centrado en servicios públicos, orden administrativo y seguimiento ciudadano.",
    note: "Lista 01",
    imageSrc: avatar01,
  },
  {
    id: "carlos-mejia",
    title: "Carlos Mejía",
    subtitle: "Alianza Social",
    description:
      "Su campaña se enfoca en participación, transparencia y fortalecimiento de barrios y veredas.",
    note: "Lista 02",
    imageSrc: avatar01,
  },
  {
    id: "laura-gomez",
    title: "Laura Gómez",
    subtitle: "Movimiento Verde",
    description:
      "Presenta una agenda de movilidad limpia, espacios públicos y gestión de recursos responsable.",
    note: "Lista 03",
    imageSrc: avatar01,
  },
  {
    id: "miguel-torres",
    title: "Miguel Torres",
    subtitle: "Frente de Progreso",
    description:
      "Promueve una administración simple, con prioridades claras y decisiones de impacto local.",
    note: "Lista 04",
    imageSrc: avatar01,
  },
  {
    id: "sofia-rivas",
    title: "Sofía Rivas",
    subtitle: "Unión Democrática",
    description:
      "Defiende un programa con enfoque social, acceso a oportunidades y control ciudadano.",
    note: "Lista 05",
    imageSrc: avatar01,
  },
  {
    id: "daniel-herrera",
    title: "Daniel Herrera",
    subtitle: "Partido del Pueblo",
    description:
      "Cierra la oferta con una propuesta de representación directa y seguimiento a compromisos.",
    note: "Lista 06",
    imageSrc: avatar01,
  },
];

export const blankVoteOption: BallotOption = {
  id: "voto-en-blanco",
  title: "Voto en blanco",
  subtitle: "Sin partido",
  description:
    "Registra un voto en blanco sin marcar a ningún candidato del tarjetón.",
  note: "Opción fija",
  imageSrc: image01,
};

export const ballotOptions: BallotOption[] = [
  ...candidateOptions,
  blankVoteOption,
];

export const flowSteps = [
  {
    id: "authentication",
    title: "Autenticación",
    description: "Verifica tu identidad antes de continuar",
  },
  {
    id: "access",
    title: "Guía",
    description: "Entiende el flujo antes de empezar",
  },
  {
    id: "vote",
    title: "Tarjetón",
    description: "Marca una sola opción",
  },
  {
    id: "confirmation",
    title: "Registro",
    description: "Revisa y confirma el voto",
  },
] as const;
