import { useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import axios from '../api/axios';
import { axiosPrivate } from "../api/axios";
const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    const { auth, setAuth } = useAuth();
    const handleLogout = async () => {
      try {
        // setLoading(true);
        await axios.post('/api/auth/logout', {
          email: auth.email,
        }).then((response) => {
          console.log(response.data);
          setAuth({})
          window.location.reload();
        }
        );
  
      } catch (err) {
        console.error(err);
      }
    }

    return (
        <section>
            <h1>Unauthorized</h1>
            <br />
            <p>You do not have access to the requested page.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
            {auth.accessToken && (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
        </section>
    )
}

export default Unauthorized
