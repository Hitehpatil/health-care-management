import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';

// Registration component
const Registration = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    mobile: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.age || isNaN(formData.age) || formData.age < 18) {
      newErrors.age = 'Age must be a number and at least 18';
      isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onRegister();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Registration</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block mb-1">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>
        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div>
          <label className="block mb-1">Mobile:</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  );
};

// Service management component
const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({ name: '', description: '', price: '' });
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    // Load services from localStorage on component mount
    const storedServices = JSON.parse(localStorage.getItem('services') || '[]');
    setServices(storedServices);
  }, []);

  useEffect(() => {
    // Save services to localStorage whenever they change
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);

  const addService = () => {
    if (newService.name && newService.description && newService.price) {
      setServices([...services, { ...newService, id: Date.now() }]);
      setNewService({ name: '', description: '', price: '' });
    }
  };

  const updateService = () => {
    if (editingService) {
      setServices(services.map(service => 
        service.id === editingService.id ? editingService : service
      ));
      setEditingService(null);
    }
  };

  const deleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Healthcare Services Management</h1>

      {/* Add New Service Form */}
      <div className="mb-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-3">Add New Service</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Name"
            value={newService.name}
            onChange={(e) => setNewService({...newService, name: e.target.value})}
            className="flex-1 px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={newService.description}
            onChange={(e) => setNewService({...newService, description: e.target.value})}
            className="flex-1 px-3 py-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newService.price}
            onChange={(e) => setNewService({...newService, price: e.target.value})}
            className="flex-1 px-3 py-2 border rounded"
          />
          <button onClick={addService} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Add Service
          </button>
        </div>
      </div>

      {/* Service List */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Service List</h2>
        {services.map(service => (
          <div key={service.id} className="mb-4 p-4 border rounded">
            {editingService && editingService.id === service.id ? (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={editingService.name}
                  onChange={(e) => setEditingService({...editingService, name: e.target.value})}
                  className="flex-1 px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  value={editingService.description}
                  onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                  className="flex-1 px-3 py-2 border rounded"
                />
                <input
                  type="number"
                  value={editingService.price}
                  onChange={(e) => setEditingService({...editingService, price: e.target.value})}
                  className="flex-1 px-3 py-2 border rounded"
                />
                <button onClick={updateService} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Update
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p>{service.description}</p>
                <p className="font-bold">Price: ${service.price}</p>
                <div className="mt-2">
                  <button 
                    onClick={() => setEditingService(service)} 
                    className="mr-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteService(service.id)} 
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App component
const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = () => {
    setIsRegistered(true);
  };

  return (
    <div className="container mx-auto px-4">
      {!isRegistered ? (
        <Registration onRegister={handleRegister} />
      ) : (
        <ServiceManagement />
      )}
    </div>
  );
};

export default App;