import { useState } from 'react';
import Select from 'react-select';


const customStyles: any = {
    control: () => ({
        alignItems: "center",
        borderColor: "transparent",
        borderRadius: "15px",
        borderStyle: "solid",
        display: "flex",
        flexWrap: "wrap",
        borderWidth: "2px"
    }),
}

interface INetwork {
    value: number,
    label: string,
    icon: JSX.Element
}

const networks: INetwork[] = [
    {
        value: 5,
        label: 'Goerli',
        icon: <img src="images/ethereum-eth-logo.png" loading="lazy" width="25" alt="" className="image-11" />
    },
    {
        value: 80001,
        label: 'Polygon',
        icon: <img src="images/polygon-matic-logo.png" loading="lazy" width="20" height="20" alt="" />
    },
];

function SelectNetwork() {
    const [selectedOption, setSelectedOption] = useState(networks[0]);


    const formatOptionLabel = ({ value, label, icon }: { value: number, label: string, icon: JSX.Element }) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {icon}
            <span style={{ marginLeft: 5 }}>{label}</span>
        </div>
    );


    return (
        <div className="">
            <Select
                styles={customStyles}
                value={selectedOption}
                options={networks}
                formatOptionLabel={formatOptionLabel}
            />
        </div>
    );
}

export default SelectNetwork;