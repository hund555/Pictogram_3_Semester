import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type AllPictograms from "../Domain/AllPictograms";
import PictogramService from "../Services/PictogramService";

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
    //Seperate Users owned Pictograms
    const usersPictogram: AllPictograms[] = allPictograms.filter(p => p.userId === localStorage.getItem("loggedInUserId"));

    //Navigates user til the same site as they are on, if clicked.
    function displayAllPictograms() {
        navigateToSite("/displayallpictograms");
    }



    return (
        <div>
            <h1>PictoPlanner</h1>

            <div>
            <h2>MyPictograms</h2>
                <DisplayMyPictograms pictograms={ usersPictogram} />
            </div>
            <h2>All Pictograms</h2>
            <div>
                {allPictograms.map(pictogram => (
                    <div key={pictogram.pictogramId} style={{ display: "flex", placeContent:"center" } }>
                        

                        <img
                            src={`data:${pictogram.fileType};base64,${pictogram.picture}`}
                            alt={pictogram.title}
                            style={{ width: "120px", height: "120px", objectFit: "cover"}}
                        />

                        <div style={{ display: "block" }}>
                            <h4>{pictogram.title}</h4>
                            <p>{pictogram.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

type PictogramProp = {
    pictograms: AllPictograms[]
}
function DisplayMyPictograms(pictograms: PictogramProp) {
    //allows to pass Objects while routing to a different site;
    const navigate = useNavigate();
    return (
        <div>
            

            <div>
                {pictograms.pictograms.map(pictogram => (
                    <div style={{display:"contents", placeContent:"center"}} key={pictogram.pictogramId}>
                       
                        <div style={{display:"flex", placeContent:"center"}  }>
                            <img
                                src={`data:${pictogram.fileType};base64,${pictogram.picture}`}
                                alt={pictogram.title}
                                style={{ width: "120px", height: "120px", objectFit: "cover" }}
                            />
                            <div style={{ display: "block" }}>
                            <h4>{pictogram.title}</h4>
                            <p>{pictogram.description}</p>
                            </div>
                        </div>
                        <br/>
                        <div>
                            <button style={{ width: "60px" }}
                                onClick={
                                    () => {
                                        const item = {
                                            pictogramId: pictogram.pictogramId,
                                            title: pictogram.title,
                                            description: pictogram.description,
                                            fileType: pictogram.fileType,
                                            isPrivate: pictogram.isPrivate,
                                            picture: pictogram.picture,
                                            userId: pictogram.userId

                                        }
                                        navigate("/editpictogram", { state: {item}})

                                    }

                            }>Ret</button>
                            <button style={{ width: "60px" }} >Slet</button>
                            

                        
                        </div>
                           
                        
                    </div>
                ))}
            </div>
        </div>
    );
}
export default DisplayAllPictograms;