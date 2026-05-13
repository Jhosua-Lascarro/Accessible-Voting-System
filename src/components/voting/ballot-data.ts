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
    id: "luna-ester",
    title: "Luna Ester",
    subtitle: "Colectivo Horizonte Ficticio",
    description:
      "Presenta una propuesta completamente ficticia con enfoque en organización, convivencia y seguimiento del proceso.",
    note: "Lista 01",
    imageSrc: avatar01,
  },
  {
    id: "noa-brisa",
    title: "Noa Brisa",
    subtitle: "Frente Nube Serena",
    description:
      "Incluye una ruta ficticia centrada en participación simple, orden visual y lectura clara.",
    note: "Lista 02",
    imageSrc: avatar01,
  },
  {
    id: "orin-vega",
    title: "Orin Vega",
    subtitle: "Movimiento Atlas Azul",
    description:
      "Desarrolla una propuesta ficticia con énfasis en ruta breve, control del flujo y claridad de lectura.",
    note: "Lista 03",
    imageSrc: avatar01,
  },
  {
    id: "sela-orbita",
    title: "Sela Orbita",
    subtitle: "Grupo Llama Gris",
    description:
      "Contiene una línea ficticia sobre acceso directo, navegación simple y confirmación visible.",
    note: "Lista 04",
    imageSrc: avatar01,
  },
  {
    id: "taro-elian",
    title: "Taro Elian",
    subtitle: "Bloque Aurora Calma",
    description:
      "Ofrece una propuesta inventada con prioridad en instrucciones cortas, orden y revisión final.",
    note: "Lista 05",
    imageSrc: avatar01,
  },
  {
    id: "mila-darien",
    title: "Mila Darien",
    subtitle: "Liga Espejo Cero",
    description:
      "Cierra el listado con una opción ficticia pensada solo para demostrar el flujo del tarjetón.",
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
  blankVoteOption,
  ...candidateOptions,
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
