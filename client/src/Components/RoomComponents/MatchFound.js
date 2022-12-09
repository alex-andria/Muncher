import React, {useState, useEffect} from "react";

function MatchFound({match}){
    console.log(match);
    return (
        <>  
            <h1>You matched on {match} Food!</h1>
        </>
    );
}

export default MatchFound;