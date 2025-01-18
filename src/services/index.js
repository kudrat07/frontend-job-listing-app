const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const register = async (data) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/signup`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials:"include",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Something went wrong');
    }
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred');
  }
};

export const login = async (data) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/signin`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials:"include",
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Something went wrong');
    }
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred');
  }
} 

export const getJobs = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/job`, {
      method:"GET",
      headers:{
        'Content-Type': 'application/json',
      },
      credentials:"include"
    })
    if (response.ok) {
      return await response.json();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Something went wrong');
    }
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred');
  }
}

export const createJob = async (data) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/job`,{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem("token")}`
      },
      body: JSON.stringify(data)
    })
    if (response.ok) {
      return await response.json();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Something went wrong');
    }
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred');
  }
}

export const jobById = async (id) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/job/${id}`, {
      method:"GET",
      headers:{
        'Content-Type': 'application/json',
      },
      credentials:"include"
    })
    if (response.ok) {
      return await response.json();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Something went wrong');
    }
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred');
  }
}
export const EditJobById = async (id,data) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/job/${id}`, {
      method:"PUT",
      headers:{
        'Content-Type': 'application/json',
         'Authorization': `${localStorage.getItem("token")}`
      },
      credentials:"include",
      body: JSON.stringify(data),
    })
    if (response.ok) {
      return await response.json();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Something went wrong');
    }
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred');
  }
}
export const DeleteJobById = async (id) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/job/${id}`, {
      method:"DELETE",
      headers:{
        'Content-Type': 'application/json',
         'Authorization': `${localStorage.getItem("token")}`
      },
      credentials:"include"
    })
    if (response.ok) {
      return await response.json();
    } else {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Something went wrong');
    }
  } catch (error) {
    throw new Error(error.message || 'An unexpected error occurred');
  }
}