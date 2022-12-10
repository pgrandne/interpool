import { useState } from "react";
import ClosedContestTable from "../components/ClosedContestTable";


function SectionContestHistory() {
    const [contestId, setContestId] = useState(2)

    return (
        <section id="history" data-w-id="90400c33-4d36-cc84-d01f-507bc873a726" className="section-account wf-section">
            <div className="container-3 w-container">
                <h1>Contest History</h1>
                <br />
                <h2 className="pointer" onClick={() => contestId === 3 ? setContestId(0) : setContestId(3)}>Contest #03 {contestId === 3 ? <i className="fa fa-solid fa-angle-up"></i> : <i className="fa fa-solid fa-angle-down"></i>}</h2>
                {contestId === 3 && <ClosedContestTable contestId={3} nbPlayers={19} />}
                <br />
                <h2 className="pointer" onClick={() => contestId === 2 ? setContestId(0) : setContestId(2)}>Contest #02 {contestId === 2 ? <i className="fa fa-solid fa-angle-up"></i> : <i className="fa fa-solid fa-angle-down"></i>}</h2>
                {contestId === 2 && <ClosedContestTable contestId={2} nbPlayers={20} />}
                <br />
                <h2 className="pointer" onClick={() => contestId === 1 ? setContestId(0) : setContestId(1)}>Contest #01 {contestId === 1 ? <i className="fa fa-solid fa-angle-up"></i> : <i className="fa fa-solid fa-angle-down"></i>}</h2>
                {contestId === 1 && <ClosedContestTable contestId={1} nbPlayers={21} />}
            </div>
        </section >
    )
}

export default SectionContestHistory;