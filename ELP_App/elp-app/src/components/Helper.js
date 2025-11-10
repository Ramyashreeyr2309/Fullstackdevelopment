const getEquipmentsData = async (token, equipmentDetails) => {
  try {
    console.log('started');
    const response = await fetch('http://localhost:4000/equipments/details?token=' + token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(equipmentDetails)
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error getting equipment list');
    }
  } catch (error) {
    console.error('Error getting equipment list:', error);
    throw error;
  }
};

const getRequestdata = async (token) => {
  try {
    console.log('started');
    const response = await fetch('http://localhost:4000/requests/user?token=' + token, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error getting request list');
    }
  } catch (error) {
    console.error('Error getting request list:', error);
    throw error;
  }
};
const getRequestdataforadmin = async (token) => {
  try {
    console.log('started');
    const response = await fetch('http://localhost:4000/requests/admin?token=' + token, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error getting request list');
    }
  } catch (error) {
    console.error('Error getting request list:', error);
    throw error;
  }
};

const Helper = {
    getEquipmentsData: getEquipmentsData,
    getRequestdata: getRequestdata,
    getRequestdataforadmin: getRequestdataforadmin
};

export default Helper;