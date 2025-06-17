import React, { useEffect, useState, useRef, forwardRef } from "react";

const CreationModal = forwardRef(({ isOpen, onClose, onSave }, ref) => {
  const [data, setData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '',
    amount: '',
    status: 'En cours',
    description: '',
    proof: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");

  const validateForm = () => {
    const newErrors = {};
    if (!data.date) newErrors.date = 'La date est requise';
    if (!data.type) newErrors.type = 'Le type est requis';
    if (!data.amount) newErrors.amount = 'Le montant est requis';
    if (!data.description) newErrors.description = 'La description est requise';
    if (!data.proof) newErrors.proof = 'Le justificatif est requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (!isOpen) {
      setData({
        date: new Date().toISOString().split('T')[0],
        type: '',
        amount: '',
        status: 'En cours',
        description: '',
        proof: null
      });
      setErrors({});
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

    if (type === 'file') {
      setData({
        ...data,
        proof: e.target.files[0] || null
      });
      if (e.target.files[0]) {
        setErrors(prev => ({ ...prev, proof: null }));
      }
    } else {
      setData({
        ...data,
        [name]: value
      });
      if (value) {
        setErrors(prev => ({ ...prev, [name]: null }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('proof', data.proof);
      formData.append('metadata', JSON.stringify({
        amount: data.amount,
        type: data.type,
        status: data.status,
        date: data.date,
        description: data.description
      }));

      const response = await fetch('https://gsb-back.onrender.com/bills', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      const billData = await response.json();
      onSave(billData);
      onClose();
    } catch (error) {
      console.error('Error saving bill:', error);
      setErrors(prev => ({ ...prev, submit: 'Erreur lors de l\'enregistrement' }));
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
    <div
      ref={ref}
      className="modal">
      <button
        onClick={onClose}
        className="close-button"
      >
        x
      </button>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column-reverse", gap: 8 }}>
        <div>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-blue-600 hover:underline"
              >
                Upload a file
              </label>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className=""
                onChange={handleChange}
                ref={fileInputRef}
                accept="image/*,.pdf"
              />
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
            {errors.proof && <p className="text-red-500 text-sm">{errors.proof}</p>}
            {data.proof && (
              <p className="text-sm text-blue-600 mt-2">
                {data.proof.name}
              </p>
            )}
          </div>

          <button
            type="submit"
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
              cursor: "pointer",
              opacity: isSubmitting ? 0.7 : 1,
              width: "100%",
            }}
          >
            {isSubmitting ? (
              <>
                <div className="spinner" style={{ display: "inline-block", marginRight: "8px" }}></div>
                Ajout en cours...
              </>
            ) : (
              "Ajouter le justicicatif"
            )}
          </button>
        </div>
        <div>
          <label style={{ display: "flex", flexDirection: "column", fontWeight: "bold", marginBottom: 10 }}>
            Date :
            <input
              name="date"
              type="date"
              value={data.date}
              onChange={handleChange}
              style={{
                border: errors.date ? "1px solid red" : "none",
                borderBottom: "2px solid #6c47b6",
                background: "transparent",
                outline: "none",
                marginTop: 2,
                color: "#000000"
              }}
              required
            />
            {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
          </label>

          <label style={{ display: "flex", flexDirection: "column", fontWeight: "bold",  marginBottom: 10}}>
            Type :
            <select
              name="type"
              value={data.type}
              onChange={handleChange}
              style={{
                border: errors.type ? "1px solid red" : "none",
                borderBottom: "2px solid #6c47b6",
                background: "transparent",
                outline: "none",
                marginTop: 2,
                color: "#000000"
              }}
              required
            >
              <option value="">Sélectionnez un type</option>
              <option value="Transport">Transport</option>
              <option value="Restauration">Restauration</option>
              <option value="Hôtel">Hôtel</option>
              <option value="Matériel">Matériel</option>
              <option value="Carburant">Carburant</option>
              <option value="Péage">Péage</option>
              <option value="Autre">Autre</option>
            </select>
            {errors.type && <span className="text-red-500 text-sm">{errors.type}</span>}
          </label>

          <label style={{ display: "flex", flexDirection: "column", fontWeight: "bold", marginBottom: 10 }}>
            Description :
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              style={{
                border: errors.description ? "2px solid red" : "2px solid #6c47b6",
                borderRadius: 4,
                background: "transparent",
                outline: "none",
                marginTop: 2,
                resize: "none"
              }}
              rows={2}
              required
            />
            {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
          </label>

          <label style={{ display: "flex", flexDirection: "column", fontWeight: "bold" }}>
            Montant :
            <input
              name="amount"
              type="number"
              value={data.amount}
              onChange={handleChange}
              style={{
                border: errors.amount ? "1px solid red" : "none",
                borderBottom: "2px solid #6c47b6",
                background: "transparent",
                outline: "none",
                marginTop: 2
              }}
              required
            />
            {errors.amount && <span className="text-red-500 text-sm">{errors.amount}</span>}
          </label>

          {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}
        </div>
      </form>
    </div>
  );
});

export default CreationModal;