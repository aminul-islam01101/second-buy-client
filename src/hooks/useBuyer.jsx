import { useEffect, useState } from 'react';

const useBuyer = (email) => {
    const [isBuyer, setIsAdmin] = useState(false);
    const [isBuyerLoading, setIsBuyerLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`${import.meta.env.VITE_API_URL}/users/buyer/${email}`)
                .then((res) => res.json())
                .then((data) => {
                    setIsAdmin(data.isBuyer);
                    setIsBuyerLoading(false);
                });
        }
    }, [email]);
    return [isBuyer, isBuyerLoading];
};

export default useBuyer;
