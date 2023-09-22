import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import useDataFetching from "../../hooks/dataFatching";
import ModalC from "./ModalC";

const Problem2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [even, setEven] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredEvenData, setFilteredEvenData] = useState([]);

  const openModal = (modalName) => {
    setCurrentModal(modalName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentModal(null);
  };

  const openDetailsModal = (contact) => {
    setSelectedContact(contact);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
  };

  const toggleEven = () => {
    setEven(!even);
  };

  let searchTimeout;

  const handleSearchInput = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      handleSearch();
    }, 300);
  };

  const handleSearch = () => {
    const sanitizedInput = searchInput.replace(/[^0-9]/g, "");
    const filteredDataByPhone = data.filter((item) => {
      const sanitizedPhone = item.phone.replace(/[^0-9]/g, "");
      return sanitizedPhone.includes(sanitizedInput);
    });

    setFilteredData(filteredDataByPhone);
    console.log(filteredData);
    setFilteredEvenData(
      even
        ? filteredDataByPhone.filter((item) => item.id % 2 === 0)
        : filteredDataByPhone
    );
  };

  const url = "https://contact.mediusware.com/api/contacts/";
  const { data, loading, error } = useDataFetching(url);

  useEffect(() => {
    if (!loading) {
      setFilteredData(data);
      setFilteredEvenData(
        even ? data.filter((item) => item.id % 2 === 0) : data
      );
    }
  }, [data, loading, even]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={() => openModal("AllContacts")}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={() => openModal("USContacts")}
          >
            US Contacts
          </button>
        </div>
        <div className="d-flex justify-content-start">
          <label>
            <input type="checkbox" checked={even} onChange={toggleEven} />
            Only even
          </label>
        </div>
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          currentModal={currentModal}
          openModal={openModal}
        >
          <input
            type="text"
            placeholder="Search Contacts..."
            value={searchInput}
            onChange={handleSearchInput}
            className="my-5"
          />
          {currentModal == "AllContacts" ? (
            <div>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ul className="d-flex flex-column gap-1">
                  {filteredEvenData.map((item) => (
                    <button
                      className="bg-white border border-primary"
                      key={item.id}
                      type="button"
                      onClick={() => openDetailsModal(item)}
                    >
                      <div>
                        <p>{item.country.name}</p>
                        <p>{item.phone}</p>
                      </div>
                    </button>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ul className="d-flex flex-column gap-1">
                  {filteredEvenData
                    .filter((item) => item.country.name === "United States")
                    .map((item) => (
                      <button
                        className="bg-white border border-primary"
                        type="button"
                        onClick={() => openDetailsModal(item)}
                        key={item.id}
                      >
                        <div>
                          <p>{item.country.name}</p>
                          <p>{item.phone}</p>
                        </div>
                      </button>
                    ))}
                </ul>
              )}
            </div>
          )}
        </Modal>
        <ModalC isOpen={isDetailsModalOpen} onClose={closeDetailsModal}>
          {selectedContact && (
            <div>
              <h1>Contact Details</h1>
              <p>Country: {selectedContact.country.name}</p>
              <p>Phone: {selectedContact.phone}</p>
            </div>
          )}
        </ModalC>
      </div>
    </div>
  );
};

export default Problem2;
