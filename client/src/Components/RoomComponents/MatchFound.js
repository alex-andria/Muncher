import React, {useState, useEffect} from "react";

function MatchFound({match}){
    console.log(match);
    return (
        <>  
            <h1>You both matched on {match}!</h1>
        </>
    );
}

export default MatchFound;