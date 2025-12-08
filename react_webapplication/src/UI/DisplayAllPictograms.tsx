import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Component to see all pictograms from MongoDB. Includes all non-private pictograms
// and the logged-in users own private pictograms.
function DisplayAllPictograms() {
    const navigateToSite = useNavigate();
    
    function displayAllPictograms() {
        navigateToSite("/displayallpictograms");
    }

    return (
        <div>
            <h1>PictoPlanner</h1>

            {/* ===== Buttons ===== */}
            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "top", marginTop: "1rem" }}>
                <button onClick={displayAllPictograms}>Piktogrammer</button>
            </div>
        </div>
    );
}
export default DisplayAllPictograms;