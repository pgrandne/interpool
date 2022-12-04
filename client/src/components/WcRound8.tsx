
interface IPrediction {
    gameId: number,
    homeScore: number,
    awayScore: number
}


function WcRound8() {

    // useContractRead({
    //     address: addressNetwork.interPoolContract,
    //     abi: ABI_Interpool,
    //     functionName: 'getPrevisionsPerPlayerPerContest',
    //     args: [2, isConnected ? address : "0x000000000000000000000000000000000000dEaD"],
    //     onSuccess(data: any) {
    //         if (isConnected) {
    //             fetchScores(data)
    //         }
    //     }
    // })


    // useEffect(() => {
    //     if (submitted) {
    //         toast("⚽ Your predictions have been saved on the blockchain!")
    //         setSubmitted(false)
    //     }
    // }, [submitted])

    // useContractRead({
    //     address: addressNetwork.interPoolContract,
    //     abi: ABI_Interpool,
    //     functionName: 'getContestPredictionSubmissionEndDate',
    //     args: [2],
    //     onSuccess(data: any) {
    //         new Date().getTime() > (parseInt(ethers.utils.formatUnits(data._hex, 0)) * 1000) ? setPredictionsOpen(false) : setPredictionsOpen(true)
    //     },
    // })

    // const [prediction, setPrediction] = useState<IPrediction[]>([{
    //     gameId: 0,
    //     homeScore: 0,
    //     awayScore: 0
    // }])

    // const { register, handleSubmit } = useForm<IFormInput>();
    // const onSubmit: SubmitHandler<IFormInput> = data => {
    //     if (ticket === 0) {
    //         toast("⚽ Get your tickets to submit your predictions!")
    //         document.getElementById('get-your-tickets')?.scrollIntoView();
    //     } else {
    //         const result = [
    //             { gameId: 3370550, homeScore: parseInt(data.match1HomeScore), awayScore: parseInt(data.match1AwayScore) }, //1
    //             { gameId: 3370551, homeScore: parseInt(data.match2HomeScore), awayScore: parseInt(data.match2AwayScore) }, //2
    //             { gameId: 3370552, homeScore: parseInt(data.match3HomeScore), awayScore: parseInt(data.match3AwayScore) }, //3
    //             { gameId: 3370553, homeScore: parseInt(data.match4HomeScore), awayScore: parseInt(data.match4AwayScore) }, //4
    //             { gameId: 3370555, homeScore: parseInt(data.match5HomeScore), awayScore: parseInt(data.match5AwayScore) }, //5
    //             { gameId: 3370554, homeScore: parseInt(data.match6HomeScore), awayScore: parseInt(data.match6AwayScore) }, //6
    //             { gameId: 3370556, homeScore: parseInt(data.match7HomeScore), awayScore: parseInt(data.match7AwayScore) }, //7
    //             { gameId: 3370557, homeScore: parseInt(data.match8HomeScore), awayScore: parseInt(data.match8AwayScore) }, //8
    //         ]
    //         setPrediction(result)
    //         console.log(prediction)
    //         setModalSubmit(true)
    //     }
    // }



    return (
        <div>
            Round 8
        </div>
    )
}

export default WcRound8;