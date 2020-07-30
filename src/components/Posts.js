/** 
 *  @fileOverview This file will have the list of users displayed and also the modal for selected user.
 *
 *  @author       G M Mufeed
 *
 *  @requires     NPM:react
 *  @requires     NPM:react-bootstrap
 *  @requires     NPM:moment
 *  @requires     NPM:react-loader-spinner
 *  @requires     NPM:react-datepicker
 *  @requires     react-datepicker/dist/react-datepicker.css:react-datepicker
 */
import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import moment from "moment";
import Loader from "react-loader-spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/**
 * Component for showing details of the user and the Modal.
 * 
 * @module Posts
 * @component
 * @param  {Object} posts - Array of Users List
 * @param  {boolean} loading - To check if the data is recieved from the API
 */
const Posts = ({ posts, loading }) => {
  const [show, setShow] = useState(false); //For Modal
  const [timer, setTimer] = useState([]);
  const [name, setName] = useState(""); //To get user name in Modal
  const [date, setDate] = useState(""); //To set the date selected
  const [total, setTotal] = useState(""); //Total hours active on particular day
  const [id, setId] = useState(""); //id of the userselected
  const [startDate, setStartDate] = useState(new Date()); //Current Date

  useEffect(() => {
    setDate(moment().format("MMM DD YYYY"));
  }, []);


  /**
   * Function to  close the modal on click
   * @method handleClose
   */
  const handleClose = () => setShow(false);


  /**
   * Function to  Generate list/filter the activity on particular day for an use
   * @method list
   * @param  {string} ida - The id of the selected user
   * @param  {string} d - Date for which the user activity must be displayed
   */
  const list = (ida, d) => {
    const founds = posts.find(post => post.id === ida);
    var arr = founds.activity_periods;
    var time = arr.find(post =>
      moment(
        moment(post.start_time, "MMM D YYYY h:mmA").format("MMM D YYYY")
      ).isSame(d)
    );
    if (time) {
      setTimer(time);
    } else {
      setTimer();
    }

    if (time)
      var set = moment
        .utc(
          moment(time.end_time, "MMM D YYYY h:mmA").diff(
            moment(time.start_time, "MMM D YYYY h:mmA")
          )
        )
        .format("HH:mm:ss");

    setName(founds.real_name);
    setTotal(set);
  };
  /**
  * Function to handle modal and show it, when clicked on an user
  * @method handleShow
  * @param   {string} ida  The id of the selected user
  * @param   {string} d   Date for which the user activity must be displayed
  */
  const handleShow = (ida, e) => {
    e.preventDefault();
    setId(ida);
    setStartDate(new Date());
    setDate(moment().format("MMM DD YYYY"));
    list(ida);
    setShow(true);
  };

  /**
   * Function to handle after the date is selceted
   * @method handleSelect
   * @param   {string} date  Date for which the user activity must be displayed
   */
  const handleSelect = date => {
    setDate(moment(date).format("MMM D YYYY"));
    setStartDate(date);
    list(id, moment(date).format("MMM D YYYY"));
  };
  /**
   * returns Loader until the values are fetched from mockAPI
   * @param  {boolean} loading
   */
  if (loading) {
    return <Loader type="Audio" color="#00BFFF" height={80} width={80} />;
  }

  return (
    <React.Fragment>
      <ul className="list-group mb-4">
        {posts.map(post => (
          <li
            key={post.id}
            className="list-group-item"
            onClick={e => handleShow(post.id, e)}
          >
            <b>Name : </b>
            {post.real_name}
            <br />
            <b>Time Zone : </b>
            {post.tz}
          </li>
        ))}
      </ul>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DatePicker
            selected={startDate}
            onSelect={handleSelect} //when day is clicked
          />
          <br />
          <b>Date : </b> {date}
          {timer ? (
            <li className="list-group-item list-group-item-success">
              {timer.start_time} to {timer.end_time}{" "}
              <span className="badge badge-primary badge-pill">
                {total} Hours
              </span>
            </li>
          ) : (
              <li className="list-group-item list-group-item-danger">
                No Activity
              </li>
            )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default Posts;
