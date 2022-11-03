import { ConnectButton } from "@rainbow-me/rainbowkit";

function Connection() {
    return (
        <div
            style={{
                border: "2px solid",
                lineHeight: "21px",
                textDecoration: "none",
                borderColor: "#000",
                borderRadius: "25px",
                color: "#000",
            }}
        >
            <ConnectButton />
        </div >
    );
};

export default Connection;