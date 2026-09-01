function FormModal({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = "max-w-3xl"
}) {
    if (!isOpen) return null;

    return (
        <dialog open className="modal">
            <div className={`modal-box w-full ${maxWidth}`}>

                {/* Header */}
                <div className="relative flex items-center justify-center mb-6">
                    <h3 className="font-bold text-xl text-center">
                        {title}
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="btn btn-sm btn-circle btn-ghost absolute right-0"
                    >
                        ✕
                    </button>
                </div>

                {children}

            </div>

            {/* Click outside */}
            <form
                method="dialog"
                className="modal-backdrop"
                onClick={onClose}
            >
                <button>close</button>
            </form>
        </dialog>
    );
}

export default FormModal;