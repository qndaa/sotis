import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import {getRoles} from "../../utils/LocalStorage";

export default () => {
    const [tests, setTests] = useState([]);
    const [isStaff, setIsStaff] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [roles, setRoles] = useState(getRoles());

    useEffect(() => {

        axios.get('http://localhost:8000/api/v1/tests/').then((response) => {
            setTests(response.data.results);
        }).catch(err => {
            console.log(err);
        })
        if (roles) {
            axios.get(`http://localhost:8000/api/v1/users/${roles.user_id}/`).then(response => {
                console.log(response);
                setIsAdmin(response.data.is_superuser);
                setIsStaff(response.data.is_staff);
            }).catch(err => console.log(err));
        }
    }, [])

    const renderTests = () => {
        return tests.map((t, i) => {
            return (
                <tr key={i}>
                    <td>
                        {i + 1}
                    </td>
                    <td>
                        {t.identifier}
                    </td>
                    <td>
                        {t.author.first_name}
                    </td>
                    <td>
                        {t.author.last_name}
                    </td>
                    <td>
                        {t.author.email}
                    </td>
                    {renderSpecActions()}
                </tr>
            )
        })
    }

    const renderSpecActions = () => {
      if (isAdmin) {
          return (
              <td>
                  <button className={`btn btn-danger`}>Obrisi</button>
              </td>
          )
      }
      if (roles && !isAdmin && !isStaff ) {
          return (
              <td>
                  <a className={`btn btn-success`}>Uradi Test</a>
              </td>
          )
      }
    }

    const renderSpecCol = () => {
        if (roles && isAdmin || (!isStaff && !isAdmin)) {
            return (
                <th>
                    Akcije
                </th>
            )
        }
    }

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Testovi:</h6>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <div className={`ml-5 mr-5`}>

                        <table className={`table table-bordered`}>
                            <thead>
                            <tr>
                                <th>Broj</th>
                                <th>
                                    Naslov testa
                                </th>
                                <th>
                                    Ima autora
                                </th>
                                <th>
                                    Prezime autora
                                </th>
                                <th>
                                    E-mail
                                </th>

                                {renderSpecCol()}
                            </tr>
                            </thead>
                            <tbody>
                            {renderTests()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}