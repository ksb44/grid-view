export async function fetchStudentsData() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        phone: user.phone,
        website: user.website,
        company: user.company,
        address: user.address
    }));
}
