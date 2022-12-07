import ClosedContestTable from "../components/ClosedContestTable";

function SectionContestHistory() {


    return (
        <section id="history" data-w-id="90400c33-4d36-cc84-d01f-507bc873a726" className="section-account wf-section">
            <div className="container-3 w-container">
                <h1>Contest History</h1>
                <br />
                <h2>Contest #01</h2>
                <ClosedContestTable contestId={1} nbPlayers={20} />
                <h2>Contest #02</h2>
                <ClosedContestTable contestId={2} nbPlayers={21} />
            </div>
        </section >
    )
}

export default SectionContestHistory;