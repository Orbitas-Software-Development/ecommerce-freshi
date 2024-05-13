using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ecommerce_freshydeli.Migrations
{
    /// <inheritdoc />
    public partial class updateclientproperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Direction",
                schema: "oss-ecommerce",
                table: "Client",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                schema: "oss-ecommerce",
                table: "Client",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PersonId",
                schema: "oss-ecommerce",
                table: "Client",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                schema: "oss-ecommerce",
                table: "Client",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Person",
                schema: "oss-ecommerce",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Person", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Person",
                schema: "oss-ecommerce");

            migrationBuilder.DropColumn(
                name: "Direction",
                schema: "oss-ecommerce",
                table: "Client");

            migrationBuilder.DropColumn(
                name: "Email",
                schema: "oss-ecommerce",
                table: "Client");

            migrationBuilder.DropColumn(
                name: "PersonId",
                schema: "oss-ecommerce",
                table: "Client");

            migrationBuilder.DropColumn(
                name: "Phone",
                schema: "oss-ecommerce",
                table: "Client");
        }
    }
}
