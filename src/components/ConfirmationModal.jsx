import React from 'react';

const ConfirmationModal = ({
    title,
    message,
    successButtonName,
    closeModal,
    modalData,
    successAction,
}) => (
    <div>
        <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
        <div className="modal ">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4 text-white">{message}</p>
                <div className="modal-action">
                    <button
                        type="button"
                        onClick={() => successAction(modalData)}
                        className="button "
                    >
                        <label className=" cursor-pointer " htmlFor="confirmation-modal">
                            {successButtonName}
                        </label>
                    </button>
                    <button type="button" onClick={closeModal} className="btn btn-outline">
                        cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default ConfirmationModal;
