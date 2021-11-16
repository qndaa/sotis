import React from "react";
import { useEffect } from "react";
import axios from "axios";

export default () => {

    const tests = [];

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/tests/').then((response) => {
            console.log(response);
            this.tests = response.data.results;
        }).catch(err => {
            console.log(err);
        })
    }, [])

    return <div>HOME</div>;
}