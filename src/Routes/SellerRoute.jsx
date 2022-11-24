import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../Contexts/AuthContext';
import useSeller from '../hooks/useSeller';

const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const [isSeller, isSellerLoading] = useSeller(user?.email);

    if (loading || isSellerLoading) {
        return (
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400" />
        );
    }

    if (user && isSeller) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default SellerRoute;
