import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllPictograms from "../Domain/AllPictograms";
import PictogramService from "../Services/PictorgramService";

// Component to see all pictograms from MongoDB. Includes all non-private pictograms
// and the logged-in users own private pictograms.
function DisplayAllPictograms() {
    const [allPictograms, setAllPictograms] = useState<AllPictograms[]>([])
    const navigateToSite = useNavigate();

    //Fetches all pictograms from the API when the component is mounted
    useEffect(() => {
        PictogramService.displayAllPictograms()
            .then(data => {
                setAllPictograms(data);
            })
            .catch(error => {
                console.error("Fejl ved hentning af piktogrammer: ", error);
            });
    }, []);

    //Navigates user til the same site as they are on, if clicked.
    function displayAllPictograms() {
        navigateToSite("/displayallpictograms");
    }

    return (
        {/* ===== JSX ===== */ }
        <div>
            <h1>PictoPlanner</h1>

            <div>
                {allPictograms.map(p => (
                    <div key={p.pictogramID}}>
                        <h4>{p.title}</h4>

                        <img
                            src={`data:${p.fileType};base64,${p.picture}`}
                            alt={p.title}
                            style={{ width: "100%", height: "150px", objectFit: "cover" }}
                        />

                        <p>{p.description}</p>
                    </div>
                ))}
            </div>


            {/* ===== Buttons ===== */}
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "top", marginTop: "1rem" }}>
                <button onClick={displayAllPictograms}>Piktogrammer</button>
            </div>
        </div>
    );
}
export default DisplayAllPictograms;