import React, { useEffect, useState, useRef } from "react";

const CreationModal = ({ isOpen, onClose, onSave }) => {
  const [data, setData] = useState({
    date: new Date().toISOString().split('T')[0],
    merchant: '',
    amount: '',
    status: 'Pending',
    description: '',
    proof: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);


  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setData({
        date: new Date().toISOString().split('T')[0],
        merchant: '',
        amount: '',
        status: 'Pending',
        description: '',
        proof: null
      });
      setIsSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    // Handle escape key press
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    // Handle click outside modal
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    console.log(name, value, type)

    if (type === 'file') {
      setData({
        ...data,
        proof: e.target.files[0] || null
      });
    } else {
      setData({
        ...data,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);

    try {

      const formData = new FormData();
      formData.append('proof', data.proof);
      console.log(data.proof)
      formData.append('metadata', JSON.stringify({ amount: data.amount, type: data.type, status: data.status, date: data.date, description: data.description }))
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MTg3NTdiNWYwZmUwMGVhYjEyOTllZiIsInJvbGUiOiJ4eHh4IiwiZW1haWwiOiJzYWZkdTcwQGdtYWlsLmNvbSIsImlhdCI6MTc0NzcyOTg1MywiZXhwIjoxNzQ3ODE2MjUzfQ.JU_EfARNbA_YlY7zXh9Lfw7xY4c25VGsTXwSD737WkQ"
      const response = await fetch('http://localhost:3000/bills', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })
      const billData = await response.json()
      onSave(billData);
      onClose();
    } catch (error) {
      console.error('Error saving bill:', error)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setData({
        ...data,
        proof: e.dataTransfer.files[0]
      });
    }
  };



  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0,0,0,0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        background: "#f3eefb",
        borderRadius: 12,
        padding: 24,
        minWidth: 320,
        boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
        position: "relative",
        border: "2px solid #6c47b6"
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "none",
            border: "none",
            fontSize: 22,
            color: "#8e44ad",
            cursor: "pointer"
          }}
        >
          ×
        </button>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 16
        }}>
          <div style={{
            width: 80,
            height: 80,
            background: "#d8d8d8",
            borderRadius: 8,
            border: "8px solid #a084ca",
            marginBottom: 12
          }} />
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label style={{ display: "flex", flexDirection: "column", fontWeight: "bold" }}>
            Montant :
            <input
              name="amount"
              type="number"
              value={data.amount}
              onChange={handleChange}
              style={{ border: "none", borderBottom: "2px solid #6c47b6", background: "transparent", outline: "none", marginTop: 2 }}
              required
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", fontWeight: "bold" }}>
            Date :
            <input
              name="date"
              type="date"
              value={data.date}
              onChange={handleChange}
              style={{ border: "none", borderBottom: "2px solid #6c47b6", background: "transparent", outline: "none", marginTop: 2 }}
              required
            />
          </label>
          <label style={{ display: "flex", flexDirection: "column", fontWeight: "bold" }}>
            Description :
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              style={{ border: "2px solid #6c47b6", borderRadius: 4, background: "transparent", outline: "none", marginTop: 2, resize: "none" }}
              rows={2}
              required
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", fontWeight: "bold" }}>
            Type :
            <input
              name="type"
              type="text"
              value={data.type}
              onChange={handleChange}
              style={{ border: "none", borderBottom: "2px solid #6c47b6", background: "transparent", outline: "none", marginTop: 2 }}
              required
            />
          </label>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Receipt
            </label>
            <div
              className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="space-y-1 text-center">

                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleChange}
                      ref={fileInputRef}
                      accept="image/*,.pdf"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>

                {data.receipt && (
                  <p className="text-sm text-blue-600 mt-2">
                    {data.receipt.name}
                  </p>
                )}
              </div>
            </div>
          </div>
          <button type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: 16,
              background: "#8e44ad",  
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "8px 0",
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer"
            }}>
             {isSubmitting ? 'Enregistrement...' : 'Ajouter la facture'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreationModal;