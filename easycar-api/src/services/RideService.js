import RideRepository from "../repositories/RideRepository.js";

async function List(
  passenger_user_id,
  pickup_date,
  ride_id,
  driver_user_id,
  status,
  status_not
) {
  const rides = await RideRepository.List(
    passenger_user_id,
    pickup_date,
    ride_id,
    driver_user_id,
    status,
    status_not
  );

  return rides;
}

async function Insert(
  passenger_user_id,
  pickup_address,
  pickup_latitude,
  pickup_longitude,
  dropoff_address
) {
  // Validation: user can only request one ride at a time
  const dt = new Date()
    .toISOString("pt-BR", {
      timezone: "America/Sao_Paulo",
    })
    .substring(0, 10);
  const searchRides = await List(passenger_user_id, dt, null, null, null, "F");

  if (searchRides.length > 0) {
    throw "You already have an unfinished ride for the current date.";
  }

  const ride = await RideRepository.Insert(
    passenger_user_id,
    pickup_address,
    pickup_latitude,
    pickup_longitude,
    dropoff_address
  );

  return ride;
}

async function Delete(ride_id) {
  const ride = await RideRepository.Delete(ride_id);

  return ride;
}

async function Finish(ride_id, passenger_user_id) {
  const ride = await RideRepository.Finish(ride_id, passenger_user_id);

  return ride;
}

async function ListForDriver(driver_user_id) {
  const rides = await RideRepository.ListForDriver(driver_user_id);

  return rides;
}

async function Accept(ride_id, driver_user_id) {

  // Validation: Driver can only accept one ride at a time
  const dt = new Date()
    .toISOString("pt-BR", {
      timezone: "America/Sao_Paulo",
    })
    .substring(0, 10);
  const searchRides = await List(null, dt, null, driver_user_id, "A", null);

  if (searchRides.length > 0) {
    throw `You already have an unfinished ride today for: ${searchRides[0].passenger_name}.`;
  }

  const ride = await RideRepository.Accept(ride_id, driver_user_id);

  return ride;
}

async function Cancel(ride_id) {
  const ride = await RideRepository.Cancel(ride_id);

  return ride;
}

export default { List, Insert, Delete, Finish, ListForDriver, Accept, Cancel };
