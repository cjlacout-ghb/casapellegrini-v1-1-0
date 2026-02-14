'use client';

export default function WhatsAppButton() {
    const phoneNumber = "5491112345678";
    const message = "Hola Casa Pellegrini, me gustaría realizar una consulta.";

    return (
        <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-10 right-10 z-[100] group"
        >
            {/* Main Action Button */}
            <div className="relative flex items-center justify-center w-16 h-16 bg-sienna rounded-full shadow-museum-lg hover:scale-110 transition-transform duration-500 ease-out">
                {/* Chat Icon */}
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-7 h-7 text-white fill-current"
                >
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z" />
                </svg>

                {/* Latent Notification Dot */}
                <div className="absolute top-0 right-0 w-4 h-4 bg-sienna border-2 border-white rounded-full animate-pulse-latent shadow-sm"></div>

                {/* Tooltip on hover */}
                <span className="absolute right-full mr-4 px-4 py-2 bg-charcoal text-white text-[10px] uppercase tracking-museum rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    Consultar Pieza
                </span>
            </div>
        </a>
    );
}
