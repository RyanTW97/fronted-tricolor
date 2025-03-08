import Image from "next/image";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.link/vtt4zc"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 transition-transform duration-300  hover:scale-125 hover:shadow-xl "
    >
      <Image
        src="/whats.svg"
        alt="WhatsApp"
        width={70} // Tamaño del botón
        height={70}
      />
    </a>
  );
};

export default WhatsAppButton;
