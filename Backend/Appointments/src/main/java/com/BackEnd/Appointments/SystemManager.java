package com.BackEnd.Appointments;

import com.BackEnd.Appointments.Services.CustomerService;
import com.BackEnd.Appointments.Repositories.*;
import com.BackEnd.Appointments.Entities.*;
import com.BackEnd.Appointments.Enums.Gender;
import com.BackEnd.Appointments.Enums.GenderService;
import com.BackEnd.Appointments.Exceptions.CustomerAlreadyExistException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class SystemManager {
    @Autowired
    private BusinessRepository businessRepository;
    @Autowired
    private BookingRepository bookingDAO;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private ServiceRepository serviceRepository;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private EmployeeServiceRepository employeeServiceRepository;
    @Autowired
    private BookmarkRepository bookmarkRepository;
    @Autowired
    private CityRepository cityRepository;
    @Autowired
    private AvailableSlotRepository availableSlotRepository;

    public void run() {

        System.out.println("Appointment System Started");

        System.out.println("Adding Business:");
        List<WorkingHours> workingHoursList = new ArrayList<>();
        LocalTime h8 = LocalTime.of(8,0);
        LocalTime h20 = LocalTime.of(20,0);
        LocalTime h14 = LocalTime.of(14,0);
        workingHoursList.add(new WorkingHours(DayOfWeek.MONDAY,h8,h20,null));
        workingHoursList.add(new WorkingHours(DayOfWeek.TUESDAY,h8,h20,null));
        workingHoursList.add(new WorkingHours(DayOfWeek.WEDNESDAY,h8,h20,null));
        workingHoursList.add(new WorkingHours(DayOfWeek.THURSDAY,h8,h20,null));
        workingHoursList.add(new WorkingHours(DayOfWeek.FRIDAY,h8,h20,null));
        workingHoursList.add(new WorkingHours(DayOfWeek.SATURDAY,h14,h20,null));
        workingHoursList.add(new WorkingHours(DayOfWeek.SUNDAY,h14,h20,null));
        City city = new City();
        city.setBusinesses(new ArrayList<>());
        city.setName("Umm El Fahem");
        this.cityRepository.save(city);
        Coordinates coordinates1 = new Coordinates(32.5153, 35.1521);
        Business business = new Business(
                "Barba",
                new ArrayList<>(),
                new ArrayList<>(),
                new ArrayList<>(),
                new ArrayList<>(),
                null,
                "0549778195",
                "We are the best Barber Shop in the entire world.\nWe are waiting for you!\nCome Enjoy!",
                "https://docs.google.com/document/d/1z2x-9u2cNngd3kIOc2zI5ukcQ3jx-52Uf6pez2VBa_8/edit?tab=t.0#heading=h.67yjym78o7pw",
                workingHoursList,
                coordinates1);
        business.setBookmarks(new ArrayList<>());

        business.setCity(city);
        business.setGenderService(GenderService.MALE);
        // Step 3: Link WorkingHours to Business
        for (WorkingHours workingHours : workingHoursList) {
            workingHours.setBusiness(business); // Set the business reference
        }
        business = businessRepository.save(business);

        System.out.println("Adding Employee:");
        Employee employee = new Employee("Abed",
                "amj450.abed@gmail.com",
                "123456789",
                business,
                "0549778195",
                LocalDate.of(2001,05,19),
                Gender.MALE);
        employee.setBookings(new ArrayList<>());
        employee.setEmployeeServices(new ArrayList<>());
        employee = employeeRepository.save(employee);
        business.getEmployees().add(employee);
        business = businessRepository.save(business);

        System.out.println("Adding Employee 1:");
        Employee employee1 = new Employee("Yamama",
                "yamamawcs@gmail.com",
                "987654321",
                business,
                "0501234567",
                LocalDate.of(2001,01,1),
                Gender.FEMALE);
        employee1.setBookings(new ArrayList<>());
        employee1.setEmployeeServices(new ArrayList<>());
        employee1 = employeeRepository.save(employee1);
        business.getEmployees().add(employee1);
        business = businessRepository.save(business);


        System.out.println(employeeRepository.findAll());

        System.out.println("Adding Customer:");
        Customer customer = new Customer("Jhon",
                "jhon@gmail.com",
                "aaaaaaaa",
                "0522222222",
                LocalDate.of(2005,12,14),
                Gender.MALE);
        customer.setBookmarks(new ArrayList<>());
        try {
            customer = customerService.addCustomer(customer);
        } catch (CustomerAlreadyExistException e) {
            System.out.println(e.getMessage());
        }

        System.out.println("Adding Category:");
        List<Business> categoryBusinesses = new ArrayList<>();
        categoryBusinesses.add(business);
        Category category = new Category("hair",
                categoryBusinesses,
                new ArrayList<>());
        category = categoryRepository.save(category);
        business.getCategories().add(category);
        business = businessRepository.save(business);

        System.out.println("Adding Service:");
        List<Employee> serviceEmployees = new ArrayList<>();
        serviceEmployees.add(employee1);
        Service service = new Service("haircut",
                100.0,
                category,
                60,
                business,
                serviceEmployees,
                new ArrayList<>());
        service.setEmployeeServices(new ArrayList<>());
        service = serviceRepository.save(service);
        category.getServices().add(service);
        category = categoryRepository.save(category);
        business.getServices().add(service);
        business = businessRepository.save(business);
        EmployeeService employeeService = new EmployeeService(employee1, service, 40);
        employeeService = employeeServiceRepository.save(employeeService);
        service = serviceRepository.findById(1);
        employee1 = employeeRepository.findEmployeeById(2);
        System.out.println(serviceRepository.findAll());

        EmployeeService employeeService1 = new EmployeeService(employee, service, 20);
        employeeService = employeeServiceRepository.save(employeeService);
        service = serviceRepository.findById(1);
        employee1 = employeeRepository.findEmployeeById(2);


        System.out.println("Adding Booking:");
        Booking booking = new Booking(business,service,employee1,customer);
        booking.book(LocalDateTime.of(2025,12,31,14,0));
        booking = bookingDAO.save(booking);

        System.out.println(customerRepository.findAll());
        System.out.println("Cancel Booking:");
        booking.cancel();
        booking = bookingDAO.save(booking);
        System.out.println(bookingDAO.findAll());
        System.out.println("test: "+ customerService.getAllCustomerBookings(3));


        Bookmark bookmark = new Bookmark(customer, business);
        bookmark = this.bookmarkRepository.save(bookmark);
        List<Bookmark> bookmarks = bookmarkRepository.findByCustomerId(3);
        System.out.println("bookmarks: "+ bookmarks);


        /* export const categories = [
    {
      id: "1",
      name: "Haircuts",
      icon: icons.cut,
      iconColor: COLORS.primary,
      backgroundColor: COLORS.tansparentPrimary,
      navigation: "Haircuts",
    },
    {
      id: "2",
      name: "Make up",
      icon: icons.brush,
      iconColor: COLORS.primary,
      backgroundColor: COLORS.tansparentPrimary,
      navigation: "Makeup",
    },
    {
      id: "3",
      name: "Manicure",
      icon: icons.manicure,
      iconColor: COLORS.primary,
      backgroundColor: COLORS.tansparentPrimary,
      navigation: "Manicure",
    },
    {
      id: "4",
      name: "Massage",
      icon: icons.massage,
      iconColor: COLORS.primary,
      backgroundColor: COLORS.tansparentPrimary,
      navigation: "Massage",
    }
  ];
  */

        Category makeup = category;
        makeup.setName("Make up");
        this.categoryRepository.save(makeup);
        Category haircut = new Category();
        haircut.setName("Haircut");
        haircut.setBusinesses(new ArrayList<>());
        haircut.setServices(new ArrayList<>());
        this.categoryRepository.save(haircut);
        Category massage = new Category();
        massage.setName("Massage");
        massage.setBusinesses(new ArrayList<>());
        massage.setServices(new ArrayList<>());
        this.categoryRepository.save(massage);
        this.businessRepository.save(business);
        Category manicure = new Category();
        manicure.setName("Manicure");
        manicure.setBusinesses(new ArrayList<>());
        manicure.setServices(new ArrayList<>());
        this.categoryRepository.save(manicure);

        System.out.println("started");

// id = 1
        business.setName("Belle Curls");
        business.setLocation("0093 Novic Parkway");
        business.setRating(4.5);
        business.setDistance("1.2 km");

        business.getCategories().add(haircut);

        businessRepository.save(business);


// id = 2
        Coordinates coordinates2 = new Coordinates(32.4994, 35.1073);
        Business business2 = new Business("Pretty Parlor", new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                "New York, Runway, 123", 4.9, "3.8 km", coordinates2);
        business2.getCategories().add(manicure);
        businessRepository.save(business2);

// id = 3
        Coordinates coordinates3 = new Coordinates(32.5037, 35.0536);
        Business business3 = new Business("Mia Bella", new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                "London, Street City, 123", 4.8, "2.3 km", coordinates3);
        business3.getCategories().add(massage);
        businessRepository.save(business3);

// id = 4
        Coordinates coordinates4 = new Coordinates(32.4557, 35.1175);
        Business business4 = new Business("Glamour Spa", new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                "Paris, Avenue de la Beauté, 45", 4.7, "5.5 km",coordinates4);
        business4.getCategories().add(makeup);
        businessRepository.save(business4);

// id = 5
        Coordinates coordinates5 = new Coordinates(32.4925, 35.1220);
        Business business5 = new Business("Nail Nirvana", new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                "Los Angeles, Sunset Boulevard, 789", 4.6, "4.1 km",coordinates5);
        business5.getCategories().add(manicure);
        businessRepository.save(business5);

// id = 6
        Coordinates coordinates6 = new Coordinates(32.4762, 35.0432);
        Business business6 = new Business("Zen Retreat", new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                "Tokyo, Sakura Street, 456", 4.9, "3.5 km",coordinates6);
        business6.getCategories().add(massage);
        businessRepository.save(business6);

// id = 7
        Coordinates coordinates7 = new Coordinates(32.5160, 35.1440);
        Business business7 = new Business("Gentleman's Grooming", new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                "Sydney, Bondi Beach, 789", 4.6, "2.8 km",coordinates7);
        business7.getCategories().add(haircut);
        businessRepository.save(business7);

// id = 8
        Coordinates coordinates8 = new Coordinates(32.4196, 35.0373);
        Business business8 = new Business("Pedicure Palace", new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                "Dubai, Sheikh Zayed Road, 321", 4.8, "6.2 km", coordinates8);
        business8.getCategories().add(makeup);
        businessRepository.save(business8);

// id = 9
        Coordinates coordinates9 = new Coordinates(32.3885, 35.0512);
        Business business9 = new Business("Relaxation Station", new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                "Rio de Janeiro, Copacabana, 456", 4.7, "3.9 km", coordinates9);
        business9.getCategories().add(massage);
        businessRepository.save(business9);

// id = 10
        Coordinates coordinates10 = new Coordinates(32.5203, 35.1350);
        Business business10 = new Business("yamama", new ArrayList<>(), new ArrayList<>(), new ArrayList<>(), new ArrayList<>(),
                "Umm El Fahem, Ein Ibrahim, 789", 4.6, "4.1 km",coordinates10);
        business10.getCategories().add(manicure);
        businessRepository.save(business10);


        /*
        * {
        id: "1",
        name: "Belle Curls",
        category: "Haircut",
        location: "0093 Novic Parkway",
        distance: "1.2 km",
        rating: "4.5",
        image: images.haircut1,
        categoryId: "2"
    }*/

//        Business belleCurls = new Business();
//        belleCurls.setName("Belle Curls");
//        belleCurls.setLocation("0093 Novic Parkway");
//        Category hairCut = new Category();
//        category.setName("Haircut");
//        category.setBusinesses(new ArrayList<>());
//        category.setServices(new ArrayList<>());


//        ObjectMapper mapper = new ObjectMapper();
//        String inputJson = "{ \"id\": 1, \"business\": { \"id\": 1 }, \"service\": { \"id\": 1 }, \"customer\": { \"id\": 3 }, \"chosenBookingTime\": \"2024-11-16T14:30:00\", \"status\": \"UPCOMING\" }";
//
//        try {
//            Booking booking1 = mapper.readValue(inputJson, Booking.class);
//            System.out.println(booking1);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }


        List<AvailableSlot> availableSlots = new ArrayList<>();

// Today to 30 days from tomorrow
        LocalDate tomorrow = LocalDate.now().plusDays(1);
        LocalDate endDate = tomorrow.plusDays(30);

        for (LocalDate date = tomorrow; !date.isAfter(endDate); date = date.plusDays(1)) {
            DayOfWeek dayOfWeek = date.getDayOfWeek();

            // Filter working hours that match this day
            for (WorkingHours workingHours : workingHoursList) {
                if (workingHours.getDayOfWeek() == dayOfWeek) {

                    LocalTime startTime = workingHours.getStartTime();
                    LocalTime endTime = workingHours.getEndTime();
                    LocalTime currentTime = startTime;
                    int duration = employeeService.getDuration();// minutes

                    while (!currentTime.plusMinutes(duration).isAfter(endTime)) {
                        LocalDateTime slotDateTime = LocalDateTime.of(date, currentTime);

                        AvailableSlot slot = new AvailableSlot();
                        slot.setBusiness(workingHours.getBusiness());
                        slot.setEmployee(employeeService.getEmployee());
                        slot.setService(employeeService.getService());
                        slot.setSlot(slotDateTime);

                        availableSlotRepository.save(slot);
                        availableSlots.add(slot);

                        currentTime = currentTime.plusMinutes(duration);
                    }
                }
            }
        }

// Today to 30 days from tomorrow
        tomorrow = LocalDate.now().plusDays(1);
        endDate = tomorrow.plusDays(30);

        for (LocalDate date = tomorrow; !date.isAfter(endDate); date = date.plusDays(1)) {
            DayOfWeek dayOfWeek = date.getDayOfWeek();

            // Filter working hours that match this day
            for (WorkingHours workingHours : workingHoursList) {
                if (workingHours.getDayOfWeek() == dayOfWeek) {

                    LocalTime startTime = workingHours.getStartTime();
                    LocalTime endTime = workingHours.getEndTime();
                    LocalTime currentTime = startTime;
                    int duration = employeeService1.getDuration();// minutes

                    while (!currentTime.plusMinutes(duration).isAfter(endTime)) {
                        LocalDateTime slotDateTime = LocalDateTime.of(date, currentTime);

                        AvailableSlot slot = new AvailableSlot();
                        slot.setBusiness(workingHours.getBusiness());
                        slot.setEmployee(employeeService1.getEmployee());
                        slot.setService(employeeService1.getService());
                        slot.setSlot(slotDateTime);

                        availableSlotRepository.save(slot);
                        availableSlots.add(slot);

                        currentTime = currentTime.plusMinutes(duration);
                    }
                }
            }
        }
    }
}
