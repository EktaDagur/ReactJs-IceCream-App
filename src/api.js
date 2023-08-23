let baseUrl = "http://localhost:8001";

async function fetch(url, options = {}) {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    return window.fetch(
        new URL(url, baseUrl),
        {...options, headers}
    );
}

export const getFlavors = async (filter = "") => {
    const response = await fetch("/flavors?filter=" + filter, {method: "GET"});
    return response.json();
};

export const getContainers = async () => {
    const response = await fetch("/containers", {method: "GET"});
    return response.json();
};

export const getSauces = async () => {
    const response = await fetch("/sauces", {method: "GET"});
    return response.json();
};

export const getToppings = async () => {
    const response = await fetch("/toppings", {method: "GET"});
    return response.json();
};
