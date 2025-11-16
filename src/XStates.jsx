import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

function XStates() {
    let [country, setCountry] = useState([]);
    let [selcountry, setSelcountry] = useState("");
    let [state, setState] = useState([]);
    let [selstate, setSelstate] = useState("")
    let [city, setCity] = useState([])
    let [selcity, setSelcity] = useState("")
    useEffect(() => {
        axios.get("https://location-selector.labs.crio.do/countries")
            .then((res) => setCountry(res.data))
            .catch((err) => console.error(err))
    }, [])
    useEffect(() => {

        if (selcountry.length > 1) {
            axios.get(`https://location-selector.labs.crio.do/country=${selcountry}/states`)
                .then((res) => {
                    setState(res.data)
                    console.log(res.data)
                }
                )
                .catch((err) => console.error(err))
        }
    }, [selcountry])
    useEffect(() => {
        if (selstate.length > 1) {
            axios.get(` https://location-selector.labs.crio.do/country=${selcountry}/state=${selstate}/cities`)
                .then((res) => {
                    setCity(res.data)
                    console.log(res.data)
                }
                )
                .catch((err) => console.error(err))
        }

    }, [selstate])

    function selectedcountry(e) {
        setSelcountry(e.target.value)
    }
    return (
        <div className="outer">
            <h1>Select Location</h1>
            <select onChange={(e) => selectedcountry(e)}>
                <option key="" value="">Select Country</option>
                {country.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                ))}
            </select>
            <select value={selstate} onChange={(e) => setSelstate(e.target.value)} disabled={selcountry.length <= 1}>
                <option value="">Select State</option>

                {selcountry.length > 1 &&
                    state.map((s, i) => (
                        <option key={i} value={s}>
                            {s}
                        </option>
                    ))}
            </select>
            <select value={selcity} onChange={(e) => setSelcity(e.target.value)} disabled={selstate.length <= 1}>
                <option value="">Select City</option>
                {selstate.length > 1 &&
                    city.map((s, i) => (
                        <option key={i} value={s}>
                            {s}
                        </option>
                    ))}
            </select>
            {selcity && selstate && selcountry && (
                <h1>You selected {selcity}, {selstate}, {selcountry}</h1>
            )}





        </div>
    );
}
export default XStates;