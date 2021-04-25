using HW4._21._21ReactPeople.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
//using System.Threading.Tasks;

namespace HW4._21._21ReactPeople.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("GetAllPeople")]
        public List<Person> GetAllPeople()
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetAllPeople();
        }


        [HttpPost]
        [Route("AddPerson")]
        public void AddPerson (Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.AddPerson(person);

        }

        [HttpPost]
        [Route("DeletePerson")]
        public void DeletePerson (Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.DeletePerson(person);
        }

        [HttpPost]
        [Route("EditPerson")]
        public void EditPerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.EditPerson(person);

        }

        [HttpPost]
        [Route("DeletePeople")]
        public void DeletePeople (List<Person> peopleToDelete)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.DeletePeople(peopleToDelete);
        }

    }
}
