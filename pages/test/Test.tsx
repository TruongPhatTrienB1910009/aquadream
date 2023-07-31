import React from 'react'
import { useContract, useContractEvents } from "@thirdweb-dev/react";

const Test = () => {
    try {
        const { contract } = useContract("0xE84C9164A6e3B718914c3933F315956bB8fE0Fc6");
        console.log(contract)
        const { data: event } = useContractEvents(contract, "Transfer")
        const { data: allEvents } = useContractEvents(contract)
        console.log(event);
        console.log(allEvents);
    } catch (error) {
        console.log(error)
    }
  return (
    <div>Test</div>
  )
}

export default Test