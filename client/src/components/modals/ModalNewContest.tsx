function ModalNewContest({ setModalNewContest }: { setModalNewContest: React.Dispatch<React.SetStateAction<boolean>> }) {

    return (
        <div className="modal-wrapper">
            <div data-w-id="8332a3c0-a742-fae8-9847-b84aee7f42c1" className="modal-outside-trigger" onClick={(e) => { setModalNewContest(false) }}></div>
            <div className="modal-inner-wrapper">
                <div className="div-block-41"><img src="images/close.png" loading="lazy" width="20" height="20" data-w-id="8332a3c0-a742-fae8-9847-b84aee7f42c4" alt="" className="image-18" onClick={(e) => { setModalNewContest(false) }} /></div>
                <h2 className="heading-6 heading-6-variation-2 heading-6-var-3">Next Contest</h2>
                <p>FIFA World Cup is over!<br /> We will back soon for a new event</p>
            </div>
        </div>
    )
}

export default ModalNewContest;
