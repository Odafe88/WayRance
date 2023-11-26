import React from 'react'
import { useAccount } from 'wagmi'
import { useContractCall } from '../hooks/useContractRead';

const Admin = () => {
    const { address } = useAccount();
    const { data } = useContractCall("wasteAdmin");
    console.log(data)

    if (address === data) {
        
    }
    return (
    <div>Admin</div>
    )
}

export default Admin