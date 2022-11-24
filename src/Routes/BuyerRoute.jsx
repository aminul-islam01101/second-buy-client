import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../Contexts/AuthContext';
import useBuyer from '../hooks/useBuyer';

const BuyerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const [isBuyer, isBuyerLoading] = useBuyer(user?.email);

    if (loading || isBuyerLoading) {
        return (
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400" />
        );
    }

    if (user && isBuyer) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default BuyerRoute;
