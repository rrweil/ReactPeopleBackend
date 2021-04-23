using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HW4._21._21ReactPeople.Data
{
    public class PeopleRepository
    {
        private readonly string _connectionString;

        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public void AddPerson(Person person)
        {
            using var ctx = new PeopleDbContext(_connectionString);
            ctx.People.Add(person);
            ctx.SaveChanges();
        }

        public List<Person> GetAllPeople()
        {
            using var ctx = new PeopleDbContext(_connectionString);
            return ctx.People.ToList();
        }

        public void DeletePerson(Person person)
        {
            using var ctx = new PeopleDbContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($"DELETE FROM People WHERE Id = {person.Id}");
        }

        public void EditPerson(Person person)
        {
            using var ctx = new PeopleDbContext(_connectionString);
            ctx.People.Attach(person);
            ctx.Entry(person).State = EntityState.Modified;
            ctx.SaveChanges();
        }
    }
}
