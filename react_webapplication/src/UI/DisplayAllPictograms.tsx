import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AllPictograms from "../Domain/AllPictograms";

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

    {/* ===== JSX ===== */}
    return (
        <div>
            <h1>PictoPlanner</h1>

            <div style={{ marginTop: "2rem", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
                {allPictograms.map(p => (
                    <div key={p.pictogramID} style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
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